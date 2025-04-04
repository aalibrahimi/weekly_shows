import {
  Body,
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
} from "@react-email/components";
import * as React from "react";
import Capitalize from "./capitalize";

interface EmailContactProps {
  name: string;
  email: string;
  service: string;
  projectDetails: string;
}

const ar_email = {
  preview: "طلب مشروع جديد من",
  PR: "طلب مشروع",
  title: "طلب مشروع جديد",
  desc: "يبحث عن خبرة في البناء.",
  clientDetails: {
    heading: "معلومات العميل",
    name: "الاسم",
    email: "البريد الإلكتروني",
  },
  footer: {
    rights: "©كنوز | أوريون. جميع الحقوق محفوظة.",
    noReply:
      "هذا البريد الإلكتروني تم إنشاؤه تلقائيًا. يرجى عدم الرد عليه مباشرة.",
  },
};

const en_email = {
  preview: "New project request from",
  PR: "PROJECT REQUEST",
  title: "New Project Request",
  desc: "is contacting you.",
  clientDetails: {
    heading: "Client Information",
    name: "Name",
    email: "Email",
  },
  footer: {
    rights: "© <Company Name>. All rights reserved.",
    noReply:
      "This email is auto-generated. Please do not reply directly.",
  },
}

export const EmailContact: React.FC<Readonly<EmailContactProps>> = ({
  name,
  email,
  service,
  projectDetails,
}) => {
  const locale = "ar";
  const direction = "rtl";
  return (
    <Html lang={locale} dir={direction}>
      <Head />

      <Tailwind>
        <Body className="bg-white font-sans my-0">
          <Preview>
            {en_email.preview} {Capitalize(name)}
          </Preview>

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
                  <Text className="text-blue-500 text-xs m-0">
                    {en_email.PR}
                  </Text>
                  <Text className="text-blue-800 font-bold text-sm m-0">
                    #PR-{Math.floor(Date.now() % 10000)}-
                    {Math.floor(100 + Math.random() * 900)}
                  </Text>
                </Column>
              </Row>
              <Hr className="border-t-4 border-blue-600 my-4 w-16 ml-0" />
            </Section>

            {/* Client Intro */}
            <Section>
              <Heading
                as="h1"
                className="text-xl font-bold mb-0 tracking-tight text-blue-900"
              >
                {en_email.title}
              </Heading>
              <Text className="text-gray-700 text-sm mt-1 mb-6">
                {Capitalize(name)} {en_email.desc}
              </Text>
            </Section>

            {/* Project Card */}
            <Section className="border border-blue-200 rounded p-3 mb-4 bg-blue-50">
              <Row>
                <Column className="w-10/12">
                  <Heading
                    as="h2"
                    className="text-base font-bold m-0 text-blue-800"
                  >
                    {service}
                  </Heading>
                  <Text className="text-sm text-gray-700 mt-2 mb-0">
                    {projectDetails}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Client Details */}
            <Section className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <Heading
                as="h3"
                className="text-sm font-bold m-0 uppercase text-blue-700"
              >
                {en_email.clientDetails.heading}
              </Heading>

              <table className="w-full mt-2 border-collapse">
                <tbody>
                  <tr>
                    <td className="py-1 text-xs text-gray-500 align-top w-20">
                      {en_email.clientDetails.name}
                    </td>
                    <td className="py-1 text-sm font-medium">
                      {Capitalize(name)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 text-xs text-gray-500 align-top">
                      {en_email.clientDetails.email}
                    </td>
                    <td className="py-1">
                      <Link
                        href={`mailto:${email}`}
                        className="text-sm text-blue-700 no-underline"
                      >
                        {email}
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
                {en_email.footer.rights}
              </Text>
              <Text className="text-xs text-blue-400 mt-1">
                {en_email.footer.noReply}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
