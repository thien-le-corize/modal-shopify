function checkConditionDisplay(idPopup) {
  var mainPopup = document.getElementById("boxModalMessageID-" + idPopup);
  if (mainPopup) {
    var dataSeconds = mainPopup.getAttribute("data-seconds") * 1000;
    var dataSessions = mainPopup.getAttribute("data-sessions");
    var dataTimes = mainPopup.getAttribute("data-times");

    if (shouldShowPopupByDay(dataTimes, idPopup) && dataTimes != 0) {
      openPopup(idPopup);
    }

    if (shouldShowPopupBySessions(dataSessions, idPopup) && dataSessions != 0) {
      openPopup(idPopup);
    }

    if (dataSeconds != 0) {
      setTimeout(function () {
        openPopup(idPopup);
      }, dataSeconds);
    }
  }
}
function closePopup(idPopup) {
  var mainPopup = document.getElementById("boxModalMessageID-" + idPopup);
  if (mainPopup) {
    mainPopup.classList.remove("popup-open");
  }
}

function openPopup(idPopup) {
  var mainPopup = document.getElementById("boxModalMessageID-" + idPopup);
  if (mainPopup) {
    mainPopup.classList.add("popup-open");
  }
}

function closeAllPopup() {
  var listPopup = document.querySelectorAll(".modal-message-popup");
  listPopup.forEach((overlay) => {
    const popupId = listPopup.getAttribute("data-idpop");
    closePopup(popupId);
  });
}

function shouldShowPopupByDay(day, idPop) {
  if (day == 0) {
    return true;
  }
  if (!day) {
    day = 7;
  }

  const lastPopupDisplayTime = localStorage.getItem(
    "lastPopupDisplayTime" + idPop
  );

  if (!lastPopupDisplayTime) {
    localStorage.setItem("lastPopupDisplayTime" + idPop, Date.now());
    return true;
  } else {
    const currentTime = Date.now();
    const timeSinceLastPopup = currentTime - lastPopupDisplayTime;
    const daysInMilliseconds = day * 24 * 60 * 60 * 1000;

    if (timeSinceLastPopup >= daysInMilliseconds) {
      localStorage.setItem("lastPopupDisplayTime" + idPop, currentTime);
      return true;
    } else {
      return false;
    }
  }
}

function shouldShowPopupBySessions(sessionX, idPop) {
  var sessionCount = sessionStorage.getItem("sessionCount" + idPop);
  if (sessionCount === null) {
    sessionStorage.setItem("sessionCount" + idPop, 1);
    sessionCount = 1;
  } else {
    sessionStorage.setItem("sessionCount" + idPop, parseInt(sessionCount) + 1);
    sessionCount = parseInt(sessionCount) + 1;
  }
  if (sessionCount <= sessionX) {
    return true;
  }
  return false;
}

var closePopupButton = document.querySelectorAll(".popup-close-modal");
var overlayPopup = document.querySelectorAll(".popup-overlay-modal");
var buttonPopup = document.querySelectorAll(".box-message-popup");
var popupElement = document.querySelectorAll(".modal-message-popup");

closePopupButton.forEach((button) => {
  button.addEventListener("click", () => {
    const popupId = button.getAttribute("data-idpop");
    closePopup(popupId);
  });
});

overlayPopup.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    const popupId = overlay.getAttribute("data-idpop");
    closePopup(popupId);
  });
});

buttonPopup.forEach((button) => {
  button.addEventListener("click", () => {
    const popupId = button.getAttribute("data-idpop");
    openPopup(popupId);
  });
});

popupElement.forEach((popup) => {
  const popupId = popup.getAttribute("data-idpop");
  checkConditionDisplay(popupId);
});
