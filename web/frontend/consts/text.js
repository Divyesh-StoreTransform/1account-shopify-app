export default {
  appInstallationGuide: [
    {
      type: 'heading',
      value: '1account app installation setup'
    },
    {
      type: 'subheading',
      value: 'Setup'
    },
    {
      type: 'paragraph',
      value: 'After the application is installed, you can see the main screen of the 1account app. The screen has “Client Id”, “Client Secret” fields, and a “Generate Script” button.'
    },
    {
      type: 'img',
      src: 'img/main-screen.png',
      alt: 'Screen with Client Id and Client Secret fields'
    },
    {
      type: 'paragraph',
      value: 'You will find the values for these fields in the 1account Developer Portal under “My Projects”.'
    },
    {
      type: 'img',
      src: 'img/my-projects.png',
      alt: '1account Developer Portal'
    },
    {
      type: 'paragraph',
      value: 'Enter the values to the Client Id and Client Secret fields in the 1account app main screen.  Click the unhide icon to copy the Client Secret.'
    },
    {
      type: 'img',
      src: 'img/main-screen-filled.png',
      alt: 'Main screen with filled inputs'
    },
    {
      type: 'paragraph',
      value: 'Click the “Generate Script” button. The generated code will then be displayed.'
    },
    {
      type: 'paragraph',
      value: 'Copy this code'
    },
    {
      type: 'img',
      src: 'img/code-to-paste.png',
      alt: 'Code to paste'
    },
    {
      type: 'paragraph',
      value: 'You can click the “Copy” button to automatically copy the code to a clipboard.'
    },
    {
      type: 'paragraph',
      value: 'Note: If you want to change Push API project you should click on the “Change Project Details” and input new project details.'
    },
    {
      type: 'paragraph',
      value: 'Paste the code to the “Additional Script” text area. To do this go to Settings > Checkout > Additional scripts (see 1, 2 and 3 on the following screenshots).'
    },
    {
      type: 'img',
      src: 'img/how-to-paste-code.png',
      alt: 'How to paste copied code'
    },
    {
      type: 'img',
      src: 'img/how-to-paste-code2.png',
      alt: 'How to paste copied code 2 screen'
    },
    {
      type: 'paragraph',
      value: 'Click “Save” when you have copied the code. After completion of these steps, the Push API will be available for age verification of your customers.'
    },
    {
      type: 'paragraph',
      value: 'If you want to change the Push API project you should click on the “Change Project Details” and input new project details.',
    },
    {
      type: 'img',
      src: 'img/change-project.png',
      alt: 'Change project details'
    },
    {
      type: 'paragraph',
      value: 'When the customer is age verified, our app adds AV to current customer and order tags. Our app allows you to verify the order and show you additional analytics, such as closing the modal by the user, failure of user validation, and so on. Below you can see the full list of tags and their explanations.'
    },
    {
      type: 'paragraph',
      value: 'AV - user successfully verified'
    },
    {
      type: 'img',
      src: 'img/av-tag.png',
      alt: 'AV tag image'
    },
    {
      type: 'paragraph',
      value: 'AV_FAIL - user fail verification'
    },
    {
      type: 'img',
      src: 'img/av-fail-tag.png',
      alt: 'AV_FAIL tag image'
    },
    {
      type: 'paragraph',
      value: 'AV_CLOSE - user close modal'
    },
    {
      type: 'img',
      src: 'img/av-close-tag.png',
      alt: 'AV_CLOSE tag image'
    },
    {
      type: 'paragraph',
      value: 'AV_PENDING - complete validation email sent'
    },
    {
      type: 'img',
      src: 'img/av-pending-tag.png',
      alt: 'AV_PENDING tag image'
    },
    {
      type: 'paragraph',
      value: 'It is also possible when 2 tags AV_CLOSE and AV_FAIL will be applied, which means that the user closed the modal window after the start of validation, for example on the pin screen.'
    },
    {
      type: 'img',
      src: 'img/av-close-and-fail-tag.png',
      alt: 'AV_CLOSE and AV_FAIL tag image'
    },
    {
      type: 'paragraph',
      value: 'When a user fails to verify or close the Av window email will go to the customer and asking them to complete age verification.'
    },
    {
      type: 'paragraph',
      value: 'Email reminders will be sent after 4 hours, 24 hours, 48 hours.'
    },
    {
      type: 'paragraph',
      value: 'We apply the tag  AV_PENDING to the order while we wait.'
    },
    {
      type: 'paragraph',
      value: 'If the customer doesn\'t successfully verify within 72 hours we will update the order tag to AV_FAIL.'
    },
    {
      type: 'heading',
      value: 'Manual installation'
    }
  ]
}