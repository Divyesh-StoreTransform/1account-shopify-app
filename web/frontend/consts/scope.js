const FIELDS = {
  '1': [
    {
      id: 'forename',
      customerValue: '{{ customer.default_address.first_name }}',
      value: '{{ checkout.billing_address.first_name }}'
    },
    {
      id: 'surname',
      customerValue: '{{ customer.default_address.last_name }}',
      value: '{{ checkout.billing_address.last_name }}'
    },
    {
      id: 'msisdn',
      customerValue: '{{ customer.default_address.phone }}',
      value: '{{ checkout.billing_address.phone }}" || "{{ customer.default_address.phone }}'
    },
    {
      id: 'email',
      customerValue: '{{ customer.email }}',
      value: '{{ checkout.email }}" || "{{ customer.email }}'
    },
    {
      id: 'country',
      customerValue: '{{ customer.default_address.country }}',
      value: '{{ checkout.billing_address.country }}'
    },
    {
      id: 'city',
      customerValue: '{{ customer.default_address.city }}',
      value: '{{ checkout.billing_address.city }}'
    },
    {
      id: 'street',
      customerValue: '{{ customer.default_address.address1 }}',
      value: '{{ checkout.billing_address.address1 }}'
    },
    {
      id: 'building',
      customerValue: '{{ customer.default_address.address2 }}',
      value: '{{ checkout.billing_address.address2 }}'
    },
    {
      id: 'postCode',
      customerValue: '{{ customer.default_address.zip }}',
      value: '{{ checkout.billing_address.zip }}'
    }
  ],
  '2': [
    {
      id: 'forename',
      customerValue: '{{ customer.default_address.first_name }}',
      value: '{{ checkout.billing_address.first_name }}'
    },
    {
      id: 'surname',
      customerValue: '{{ customer.default_address.last_name }}',
      value: '{{ checkout.billing_address.last_name }}'
    },
    {
      id: 'msisdn',
      customerValue: '{{ customer.default_address.phone }}',
      value: '{{ checkout.billing_address.phone }}" || "{{ customer.default_address.phone }}'
    },
    {
      id: 'email',
      customerValue: '{{ customer.email }}',
      value: '{{ checkout.email }}" || "{{ customer.email }}'
    },
    {
      id: 'country',
      customerValue: '{{ customer.default_address.country }}',
      value: '{{ checkout.billing_address.country }}'
    },
    {
      id: 'city',
      customerValue: '{{ customer.default_address.city }}',
      value: '{{ checkout.billing_address.city }}'
    },
    {
      id: 'street',
      customerValue: '{{ customer.default_address.address1 }}',
      value: '{{ checkout.billing_address.address1 }}'
    },
    {
      id: 'building',
      customerValue: '{{ customer.default_address.address2 }}',
      value: '{{ checkout.billing_address.address2 }}'
    },
    {
      id: 'postCode',
      customerValue: '{{ customer.default_address.zip }}',
      value: '{{ checkout.billing_address.zip }}'
    }
  ],
  '3': [
    {
      id: 'forename',
      customerValue: '{{ customer.default_address.first_name }}',
      value: '{{ checkout.billing_address.first_name }}'
    },
    {
      id: 'surname',
      customerValue: '{{ customer.default_address.last_name }}',
      value: '{{ checkout.billing_address.last_name }}'
    },
    {
      id: 'email',
      customerValue: '{{ customer.email }}',
      value: '{{ checkout.email }}" || "{{ customer.email }}'
    },
    {
      id: 'msisdn',
      customerValue: '{{ customer.default_address.phone }}',
      value: '{{ checkout.billing_address.phone }}" || "{{ customer.default_address.phone }}'
    },
    {
      id: 'dob',
      customerValue: '',
      value: ''
    },
    {
      id: 'building',
      customerValue: '{{ customer.default_address.address2 }}',
      value: '{{ checkout.billing_address.address2 }}'
    },
    {
      id: 'street',
      customerValue: '{{ customer.default_address.address1 }}',
      value: '{{ checkout.billing_address.address1 }}'
    },
    {
      id: 'city',
      customerValue: '{{ customer.default_address.city }}',
      value: '{{ checkout.billing_address.city }}'
    },
    {
      id: 'postCode',
      customerValue: '{{ customer.default_address.zip }}',
      value: '{{ checkout.billing_address.zip }}'
    },
    {
      id: 'country',
      customerValue: '{{ customer.default_address.country }}',
      value: '{{ checkout.billing_address.country }}'
    }
  ],
  '4': [
    {
      id: 'forename',
      customerValue: '{{ customer.default_address.first_name }}',
      value: '{{ checkout.billing_address.first_name }}'
    },
    {
      id: 'surname',
      customerValue: '{{ customer.default_address.last_name }}',
      value: '{{ checkout.billing_address.last_name }}'
    },
    {
      id: 'msisdn',
      customerValue: '{{ customer.default_address.phone }}',
      value: '{{ checkout.billing_address.phone }}" || "{{ customer.default_address.phone }}'
    },
    {
      id: 'email',
      customerValue: '{{ customer.email }}',
      value: '{{ checkout.email }}" || "{{ customer.email }}'
    },
    {
      id: 'dob',
      customerValue: '',
      value: ''
    },
    {
      id: 'building',
      customerValue: '{{ customer.default_address.address2 }}',
      value: '{{ checkout.billing_address.address2 }}'
    },
    {
      id: 'street',
      customerValue: '{{ customer.default_address1 }}',
      value: '{{ checkout.billing_address.address1 }}'
    },
    {
      id: 'city',
      customerValue: '{{ customer.default_address.city }}',
      value: '{{ checkout.billing_address.city }}'
    },
    {
      id: 'postCode',
      customerValue: '{{ customer.default_address.zip }}',
      value: '{{ checkout.billing_address.zip }}'
    },
    {
      id: 'country',
      customerValue: '{{ customer.default_address.country }}',
      value: '{{ checkout.billing_address.country }}'
    }
  ]
}

export default {
  FIELDS
}