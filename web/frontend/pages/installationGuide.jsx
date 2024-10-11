import { useMemo } from 'react'
import {
  Frame,
  Heading,
  Layout,
  Page,
  Stack,
  Subheading,
} from '@shopify/polaris'
import { TitleBar } from '@shopify/app-bridge-react'

import { text } from '../consts'

export default function AppInstallationGuide() {
  const renderContent = useMemo(() => {
    return text.appInstallationGuide.map((item, index) => {
      switch (item.type) {
        case 'heading':
          return <Heading key={index}>{item.value}</Heading>
        case 'subheading':
          return <Subheading key={index}>{item.value}</Subheading>
        case 'img':
          return (
            <img
              src={item.src}
              alt={item.alt}
              style={{ width: '100%', maxWidth: '100%' }}
            />
          )

        default:
          return <p key={index}>{item.value}</p>
      }
    })
  }, [])

  return (
    <Page>
      <TitleBar title={'Installation Guide'} />
      <Frame>
        <Layout>
          <Layout.Section>
            <Stack vertical spacing="loose" wrap={false}>
              {renderContent}
              <p>
                If you need more details, please, read this documentation -{' '}
                <a
                  href="https://1-account-media.s3.eu-west-2.amazonaws.com/pdf/KYC+Integration+Setup+-+v12.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1Account Integration Guide
                </a>
              </p>
            </Stack>
          </Layout.Section>
        </Layout>
      </Frame>
    </Page>
  )
}
