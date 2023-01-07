export function SupportModal({ onClose } = {}) {

  function copyText(t) {
    acord.utils.copyText(t);
    acord.ui.toasts.show(acord.i18n.format("X_COPIED", t));
  }

  return <div className="container">
    <div className="image-container">
      <img src="https://acord.app/api/logo.svg?fg=fafafa" />
    </div>
    <div className="info-container">
      <p>{acord.i18n.locale == "tr" ? "Sizin desteğinize ihtiyacım var." : "I need yours support."}</p>
      <br />
      <br />
      <a href="#" onClick={() => {
        acord.modules.common.InviteActions.acceptInvite({
          inviteKey: "acord",
        }).then(() => {
          acord.modules.common.Router.transitionTo(
            "/channels/1028763227519209534/1029415331439067157/1061133737921880074"
          );
          onClose();
        });
      }}>
        {acord.i18n.locale == "tr" ? "Daha fazla bilgi için lütfen buraya tıklayın." : "For more information, please click here."}
      </a>
      <br />
      <br />
      <br />
      <h1>{acord.i18n.locale == "tr" ? "Banka Hesap Bilgilerim" : "My Bank Account Information"}:</h1>
      <br />
      <p>{acord.i18n.locale == "tr" ? "Tam İsim" : "Full Name"}: <code onClick={() => copyText("KIRAÇ ARMAĞAN ÖNAL")}>KIRAÇ ARMAĞAN ÖNAL</code></p>
      <p>{acord.i18n.locale == "tr" ? "Banka İsmi" : "Bank Name"}: <code onClick={() => copyText("Türkiye İş Bankası")}>Türkiye İş Bankası</code></p>
      <p>IBAN: <code onClick={() => copyText("TR560006400000111011385506")}>TR560006400000111011385506</code></p>
      <p className="half-opacity">{acord.i18n.locale == "tr" ? "Lütfen Discord hesabının tam ismini ve idsini bağış yaparken not olarak bırak." : "Please leave the tag and id of your Discord account as a note when donating."}</p>
    </div>
  </div>
}