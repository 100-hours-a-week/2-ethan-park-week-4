
function updateProfile() {
    let nickname = document.getElementById("nickname").value;
    let errorText = document.getElementById("errorText");
    errorText.textContent = "";

    if (!nickname) {
        errorText.textContent = "*닉네임을 입력해주세요.";
        return;
    }
    if (nickname.length > 10) {
        errorText.textContent = "*닉네임은 최대 10자까지 가능합니다.";
        return;
    }

    let toast = document.getElementById("toast");
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 2000);
}

function showModal() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

function hideModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modal").style.display = "none";
}

function confirmDelete() {
    alert("회원 탈퇴 완료! 로그인 페이지로 이동");
    hideModal();
    window.location.href = "../login/login.html";
}

window.onclick = function(event) {
    if (!event.target.matches(".profile-img")) {
        document.getElementById("dropdownMenu").style.display = "none";
    }
};