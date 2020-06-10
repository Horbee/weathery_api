import sgMail, { MailDataRequired } from "@sendgrid/mail";

import { AppConfig } from "../config/appconfig";

sgMail.setApiKey(AppConfig.mailAPIKey);

const templates = {
  forgot_password: AppConfig.forgotPasswordMailTemplate
};

export const sendForgotPasswordMail = async (
  email: string,
  name: string,
  token: string
) => {
  const msg = {
    to: email,
    from: AppConfig.mailFrom,
    templateId: templates.forgot_password,
    dynamic_template_data: {
      name: name,
      url: `${AppConfig.clientUrl}/resetpassword?token=${token}`
    }
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error(err);

    if (err.response) {
      console.error(err.response.body);
    }
  }
};
