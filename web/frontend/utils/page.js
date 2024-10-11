import Cookies from 'js-cookie'
import { scope as AV_LEVEL, messages } from '../consts'

const ONE_ACCOUNT_API_URL = import.meta.env.VITE_ONE_ACCOUNT_API_URL
const ONE_ACCOUNT_WEBAPP_URL = import.meta.env.VITE_ONE_ACCOUNT_WEBAPP_URL

function getPushValidateFields(avLevel) {
  const levelsArray = AV_LEVEL.FIELDS[avLevel]
  return levelsArray.reduce((fields, field) => {
    if (levelsArray.indexOf(field) === levelsArray.length - 1) {
      return (fields += `${field.id}`)
    }

    return (fields += `${field.id},
        `)
  }, '')
}

function generateUserFields(avLevel) {
  return AV_LEVEL.FIELDS[avLevel].reduce((acc, item) => {
    return (acc += `const ${item.id} = "${item.value}";
    `)
  }, '')
}

function generatePush(logo, avLevel, clientId) {
  const updateUserUrl = `${ONE_ACCOUNT_API_URL}/platforms/shopify/client`
  const updateOrderUrl = `${ONE_ACCOUNT_API_URL}/platforms/shopify/order`
  const reminderUrl = `${ONE_ACCOUNT_API_URL}/platforms/shopify/reminders`
  const invocationUrl = `${ONE_ACCOUNT_API_URL}/tools/push/invocation`
  const shop = Cookies.get('shopOrigin')

  return `
  <script
    id="one-account-push-api"
    data-logo="${logo ? logo : ''}"
    data-shopify="1"
    src="${ONE_ACCOUNT_WEBAPP_URL}/pushApi/index.js"
  ></script>

  <script>

  const orderId = "{{ checkout.order.id }}" || null
  
  if(!orderId) {
    window.location.reload()
  }

  function updateOrderTag(tag) {
    fetch("${updateOrderUrl}", {
      method: "POST",
      body: JSON.stringify({
        shop: "${shop}",
        orderId: orderId,
        tag: tag
      }),
    })
  }
  
  {% assign show_iframe_countries = 'United Kingdom,Guernsey,Isle of Man,Jersey' | split: ',' %}
  
  {% if show_iframe_countries contains checkout.order.billing_address.country or uk_countries contains checkout.order.shipping_address.country %}
  
    let allTags = []
    const cartSize = "{{checkout.order.line_items.size}}"
  
    {% for line_item in checkout.order.line_items %}
      {% for tag in line_item.product.tags %}
        allTags.push("{{tag }}")
      {% endfor %}
    {% endfor %}
  
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  function sendPushInvocation() {
    fetch("${invocationUrl}", {
      method: "POST",
      body: JSON.stringify({
        shop: "${shop}",
        orderId: orderId,
        storeName: window.location.host,
        checkoutUrl: window.location.href
      }),
    })
  }
  
  function sendEmailRemainder(modalClosed) {
    const data = {
      shop: "${shop}",
      checkoutUrl: window.location.href,
      orderId: orderId,
      clientId: "${clientId}",
      storeName: window.location.host,
      modalClosed: modalClosed
    }
  
    fetch("${reminderUrl}", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }

    {% if checkout.order.customer.tags contains "AV" %}
      updateOrderTag("AV");
    {% else %}

    const customerId = {{ checkout.order.customer.id }}
    const sessionId = {{ checkout.order.id }}
    ${generateUserFields(avLevel)}

    let requireAv = allTags.filter(tag => tag.toLowerCase() === "skip_av").length < cartSize

    if (requireAv) {
      PUSH_API.init({
        authCode: uuid(),
        avLevel: "${avLevel}",
        clientId: "${clientId}",
        sessionId: sessionId,
        onClose: () => {
          updateOrderTag("AV_CLOSE");
          sendEmailRemainder(true);
        },
        onComplete: (res) => {
          if (res.status === "AV_SUCCESS") {
            updateOrderTag("AV")
            fetch("${updateUserUrl}", {
              method: "POST",
              body: JSON.stringify({
                shop: "${Cookies.get('shopOrigin')}",
                tag: "BOTH",
                clientId: customerId,
              }),
            })
              .then(res => res.json())
              .then(res => {
                if (res.errors) {
                  setTimeout(function () {
                    alert("${messages.USER_UPDATE_FAIL}");
                  }, 1000);
                } else {
                  setTimeout(function () {
                    alert("${messages.SUCCESS}");
                  }, 1000);
                }
              });
          } else {
            setTimeout(function () {
              alert("${messages.FAIL}");
              sendEmailRemainder(false);
            }, 1000);
          }
        },
      });
      
      sendPushInvocation();
      window.onload = function () {
        PUSH_API.validate({
          ${getPushValidateFields(avLevel)}
        });
      }
    } else {
      updateOrderTag("AV_NOT_REQUIRED")
    }
    
  {% endif %}
  {% else %}
    updateOrderTag("NON_UK_USER");
  {% endif %}
  </script>
`
}

export default {
  generatePush,
}
