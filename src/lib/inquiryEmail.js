const ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ESCAPES[char]);

const FIELDS = [
  ["Name", "name"],
  ["Email", "email"],
  ["Company / creator", "company"],
  ["Website or Instagram", "website"],
  ["Looking to build", "projectType"],
  ["Message", "message"],
];

// Builds the notification email from normalized inquiry values.
export function buildInquiryEmail(values) {
  const rows = FIELDS.map(([label, key]) => [label, values[key] || "—"]);

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 0;border-top:1px solid #d9d8d0;width:170px;vertical-align:top;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b6c66;">${label}</td>
          <td style="padding:14px 0;border-top:1px solid #d9d8d0;vertical-align:top;font-size:15px;line-height:1.6;color:#0b0b0c;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f4f3ef;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;">
      <tr>
        <td style="padding-bottom:24px;font-size:22px;letter-spacing:-0.5px;color:#0b0b0c;">New project inquiry</td>
      </tr>
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${htmlRows}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top:24px;border-top:1px solid #d9d8d0;font-size:12px;color:#6b6c66;">Sent from the MonoDuo website contact form. Reply to this email to answer ${escapeHtml(values.name)} directly.</td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New project inquiry",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  return {
    subject: `New inquiry — ${values.company || values.name}`,
    html,
    text,
  };
}
