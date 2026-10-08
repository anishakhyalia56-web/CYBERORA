const email = document.getElementById("email");
const continueBtn = document.getElementById("continueBtn");
const emailMessage = document.getElementById("emailMessage");

if (email && continueBtn && emailMessage) {

    email.addEventListener("input", function () {
        if (email.validity.valid && email.value.trim() !== "") {
            continueBtn.disabled = false;
            emailMessage.textContent = "";
        } else {
            continueBtn.disabled = true;
        }
    });

    continueBtn.addEventListener("click", function () {
        window.location.href = "dashboard.html";
    });
}
const linkInput = document.getElementById("linkInput");
const checkLinkBtn = document.getElementById("checkLinkBtn");
const result = document.getElementById("result");

if (checkLinkBtn) {
    checkLinkBtn.addEventListener("click", function () {

        const link = linkInput.value.trim();

        if (link === "") {
            result.textContent = "Please enter a website link.";
            return;
        }

        try {
            const url = new URL(link);
            const hostname = url.hostname;

            const warnings = [];

            if (url.protocol !== "https:") {
                warnings.push("The link does not use HTTPS.");
            }

            if (link.includes("@")) {
                warnings.push("The URL contains an @ symbol.");
            }

            if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
                warnings.push("The link uses a direct IP address.");
            }

            if (hostname.includes("xn--")) {
                warnings.push("The domain uses punycode.");
            }

            if (hostname.split(".").length > 4) {
                warnings.push("The domain has many subdomains.");
            }

            if (warnings.length > 0) {
                result.innerHTML =
                    "🟠 <strong>Suspicious / Uncertain</strong><br><br>" +
                    warnings.join("<br>") +
                    "<br><br>Verify the website independently before entering personal information.";
            } else {
                result.innerHTML =
                    "🟢 <strong>No basic warning signs detected.</strong><br><br>" +
                    "This does not guarantee that the website is completely safe.";
            }

        } catch (error) {
            result.className="result-danger";
            result.textContent =
                "🔴 Invalid link. Please enter a complete website address.";
        }
    });
}
const messageInput = document.getElementById("messageInput");
const checkMessageBtn = document.getElementById("checkMessageBtn");
const messageResult = document.getElementById("messageResult");

if (checkMessageBtn) {
    checkMessageBtn.addEventListener("click", function () {

        const message = messageInput.value.trim();

        if (message === "") {
            messageResult.textContent =
                "Please paste a message to check.";
            return;
        }

        const text = message.toLowerCase();
        const warnings = [];

        if (/\b(otp|one[- ]time password)\b/.test(text)) {
            warnings.push(
                "The message asks for an OTP or one-time password."
            );
        }

        if (/\b(password|passcode|pin)\b/.test(text)) {
            warnings.push(
                "The message asks for sensitive login information."
            );
        }

        if (/\b(pay|payment|transfer|upi|bank|card)\b/.test(text)) {
            warnings.push(
                "The message mentions payment or financial information."
            );
        }

        if (/\b(urgent|immediately|act now)\b/.test(text)) {
            warnings.push(
                "The message uses urgent or pressure-based language."
            );
        }

        if (/\b(blocked|suspended|closed|deactivated)\b/.test(text)) {
            warnings.push(
                "The message uses account-threat language."
            );
        }

        if (/https?:\/\/|www\./i.test(text)) {
            warnings.push(
                "The message contains a website link."
            );
        }

        if (warnings.length >= 2) {
            result.className="result-warning";

            messageResult.innerHTML =
                "🔴 <strong>High Risk Warning Signs</strong><br><br>" +
                warnings.join("<br>") +
                "<br><br>" +
                "Do not share OTPs, passwords, PINs, or payment details. " +
                "Verify the message through the organisation's official website or app.";

        } else if (warnings.length === 1) {

            messageResult.innerHTML =
                "🟠 <strong>Suspicious / Uncertain</strong><br><br>" +
                warnings.join("<br>") +
                "<br><br>" +
                "Verify the message independently before taking action.";

        } else {
            result.className="result-safe";

            messageResult.innerHTML =
                "🟢 <strong>No basic warning signs detected.</strong><br><br>" +
                "This does not guarantee that the website is completely safe.";
        }
    });
}
function showLesson(lessonId) {

    const cards = document.querySelectorAll(".learning-card");

    const lessonNumber = {
        passwordLesson: 0,
        otpLesson: 1,
        linkLesson: 2,
        updateLesson: 3,
        trustLesson: 4
    };

    const card = cards[lessonNumber[lessonId]];

    if (!card) {
        return;
    }

    const content = card.querySelectorAll("p, h3");

    const isHidden = content[0].style.display === "none";

    content.forEach(function(item) {

        if (isHidden) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }

    });
}
const securityChecks = document.querySelectorAll(".security-check");
const checkSecurityBtn = document.getElementById("checkSecurityBtn");
const securityResult = document.getElementById("securityResult");

if (checkSecurityBtn) {

    checkSecurityBtn.addEventListener("click", function () {

        const totalChecks = securityChecks.length;

        const completedChecks =
            document.querySelectorAll(".security-check:checked").length;

        if (completedChecks === totalChecks) {

            securityResult.innerHTML =
                "🟢 <strong>Great! Your basic security checklist is complete.</strong><br><br>" +
                "Keep reviewing your security settings regularly.";

        } else if (completedChecks >= 3) {

            securityResult.innerHTML =
                "🟠 <strong>Good progress, but some security steps remain.</strong><br><br>" +
                "Review the unchecked items and improve them when possible.";

        } else {

            securityResult.innerHTML =
                "🔴 <strong>Some important security steps are missing.</strong><br><br>" +
                "Review the checklist and improve your basic security settings.";
        }

    });

}

           