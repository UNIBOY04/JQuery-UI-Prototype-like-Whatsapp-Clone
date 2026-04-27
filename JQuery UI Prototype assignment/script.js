$(document).ready(function () {

  let currentChat = "chat1";

  // Get current time
  function getTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ":" + minutes;
  }

  // Auto-scroll to bottom
  function autoScroll() {
    let chat = $("#" + currentChat);
    chat.scrollTop(chat[0].scrollHeight);
  }

  // AI Reply Logic
  function getAIReply(userMsg) {
    userMsg = userMsg.toLowerCase();

    if (userMsg.includes("hi") || userMsg.includes("hello")) {
      return "Hello! 😊 How can I help you?";
    }
    else if (userMsg.includes("how are you")) {
      return "I'm doing great! Thanks for asking 🙌";
    }
    else if (userMsg.includes("your name")) {
      return "I'm your AI Assistant 🤖";
    }
    else if (userMsg.includes("time")) {
      return "Current time is " + getTime();
    }
    else if (userMsg.includes("bye")) {
      return "Goodbye! 👋";
    }
    else {
      return "Interesting 🤔 Tell me more!";
    }
  }

  // Typing indicator + AI reply
  function typingReply(userMsg) {
    $("#typing").show();

    setTimeout(function () {
      $("#typing").hide();

      let replyText = getAIReply(userMsg);

      let replyHTML = `
        <div class="message received">
          ${replyText}
          <div class="timestamp">${getTime()}</div>
        </div>
      `;

      $("#" + currentChat).append(replyHTML);
      autoScroll();

    }, 1500);
  }

  // Send message
  function sendMessage() {
    let msg = $("#message").val().trim();
    if (msg === "") return;

    let messageHTML = `
      <div class="message sent">
        ${msg}
        <div class="timestamp">${getTime()}</div>
      </div>
    `;

    $("#" + currentChat).append(messageHTML);

    $("#message").val("");

    autoScroll();

    // Call AI reply
    typingReply(msg);
  }

  // Send button click
  $("#sendBtn").click(function () {
    sendMessage();
  });

  // Enter key send
  $("#message").keypress(function (e) {
    if (e.which === 13) {
      sendMessage();
    }
  });

  // Toggle contacts
  $(".contact").click(function () {
    $(".contact").removeClass("active");
    $(this).addClass("active");

    $(".chat-box").addClass("hidden");

    currentChat = $(this).data("chat");
    $("#" + currentChat).removeClass("hidden");

    $("#chatHeader").text($(this).text());
  });

});
