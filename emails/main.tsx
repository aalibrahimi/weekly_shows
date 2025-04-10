import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import Capitalize from "@/MyComponents/capitalize";
import { getLangDir } from "rtl-detect";

// React Email Components: https://react.email/components

const data = {
  firstName: "blaze",
  lastName: "hunter",
  email: "blazehunterhp@gmail.com",
  phone: "+1 (404) 111 111",
  projectType: "Normal Construction",
  projectDetails: "I need help constructing this amazing company building. Lorem lorem and more and more lorem till there is no end to this lorem. Please stop the lorem before it's too much!",
};

const EmailPreview = () => {
  const locale = "en"
  const direction = getLangDir(locale);
  
  return (
    <Html lang={locale} dir={direction}>
      <Head />

      <Tailwind>
        <Body className="bg-white font-sans my-0">
          <Preview>New project request from {Capitalize(data.firstName)} {Capitalize(data.lastName)}</Preview>
          
          <Container className="max-w-[600px] mx-auto">
            {/* Modern Header with Blue Accent Bar */}
            <Section className="pt-4">
              <Row>
                <Column>
                  <Img 
                    src="https://knoz.codewithali.com/knoz.png"
                    alt="Logo" 
                    width="50"
                    height="35" 
                  />
                </Column>
                <Column className="text-right">
                  <Text className="text-blue-500 text-xs m-0">PROJECT REQUEST</Text>
                  <Text className="text-blue-800 font-bold text-sm m-0">#PR-{Math.floor(1000 + Math.random() * 9000)}</Text>
                </Column>
              </Row>
              <Hr className="border-t-4 border-blue-600 my-4 w-16 ml-0" />
            </Section>

            {/* Client Intro */}
            <Section>
              <Heading as="h1" className="text-xl font-bold mb-0 tracking-tight text-blue-900">
                New Project Request
              </Heading>
              <Text className="text-gray-700 text-sm mt-1 mb-6">
                {Capitalize(data.firstName)} {Capitalize(data.lastName)} is looking for construction expertise.
              </Text>
            </Section>

            {/* Project Card */}
            <Section className="border border-blue-200 rounded p-3 mb-4 bg-blue-50">
              <Row>
                <Column className="w-10/12">
                  <Heading as="h2" className="text-base font-bold m-0 text-blue-800">
                    {data.projectType}
                  </Heading>
                  <Text className="text-sm text-gray-700 mt-2 mb-0">
                    {data.projectDetails}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Client Details */}
            <Section className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <Heading as="h3" className="text-sm font-bold m-0 uppercase text-blue-700">
                Client Information
              </Heading>
              
              <table className="w-full mt-2 border-collapse">
                <tbody>
                  <tr>
                    <td className="py-1 text-xs text-gray-500 align-top w-20">Name</td>
                    <td className="py-1 text-sm font-medium">
                      {Capitalize(data.firstName)} {Capitalize(data.lastName)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 text-xs text-gray-500 align-top">Email</td>
                    <td className="py-1">
                      <Link href={`mailto:${data.email}`} className="text-sm text-blue-700 no-underline">
                        {data.email}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 text-xs text-gray-500 align-top">Phone</td>
                    <td className="py-1">
                      <Link href={`tel:${data.phone}`} className="text-sm text-blue-700 no-underline">
                        {data.phone}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Footer */}
            <Hr className="border-blue-100 my-6" />
            <Section>
              <Text className="text-xs text-blue-800 m-0">
                ©Knoz | Orion. All rights reserved.
              </Text>
              <Text className="text-xs text-blue-400 mt-1">
                This email is auto-generated. Please do not reply directly.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailPreview;