// 뒤로가기 함수
function goBack(event) {
    event.preventDefault();
    window.history.back();
}

// 네비게이션 바 로드 함수
function loadNavbar() {
    fetch("../navbar/navbar.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("navbar-container").innerHTML = html;

        // ✅ 네비게이션 바가 로드된 후 이벤트 리스너 추가
        setupDropdownToggle();
    })
    .catch(error => console.error("Navbar 불러오기 실패:", error));
}

// ✅ 드롭다운 토글 함수 (navbar가 로드된 후 실행해야 함)
function setupDropdownToggle() {
    let profileToggle = document.querySelector(".profile-toggle");
    let dropdown = document.getElementById("dropdownMenu");

    console.log("profileToggle:", profileToggle); // ✅ 콘솔에서 확인
    console.log("dropdown:", dropdown); // ✅ 콘솔에서 확인

    if (profileToggle && dropdown) {
        profileToggle.addEventListener("click", function(event) {
            event.stopPropagation();
            dropdown.classList.toggle("show");
        });

        // ✅ 비밀번호수정 클릭 시 페이지 이동 이벤트 추가
        let passwordEdit = dropdown.querySelector("li:nth-child(2)"); // 두 번째 li (비밀번호수정)
        if (passwordEdit) {
            passwordEdit.addEventListener("click", function() {
                window.location.href = "../edit-password/edit-password.html";
            });
        }
        
    } else {
        console.error("Navbar 요소를 찾을 수 없음");
    }
}

// ✅ 페이지 로드 시 네비게이션 바 로드
window.addEventListener("load", loadNavbar);

// ✅ 드롭다운 닫기 기능 (navbar가 로드된 후에 실행해야 함)
document.addEventListener("click", function(event) {
    let dropdown = document.getElementById("dropdownMenu");

    if (dropdown && dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
    }
});
