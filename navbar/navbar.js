document.addEventListener("DOMContentLoaded", () => {
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
                // 네비게이션 바가 로드된 후 드롭다운 이벤트 설정
                setupDropdownToggle();
            })
            .catch(error => console.error("Navbar 불러오기 실패:", error));
    }

    // 드롭다운 토글 및 클릭 이벤트 설정 함수
    function setupDropdownToggle() {
        const profileToggle = document.querySelector(".profile-toggle");
        const dropdown = document.getElementById("dropdownMenu");

        console.log("profileToggle:", profileToggle);
        console.log("dropdown:", dropdown);

        if (profileToggle && dropdown) {
            // 프로필 사진 클릭 시 드롭다운 토글
            profileToggle.addEventListener("click", function(event) {
                event.stopPropagation();
                dropdown.classList.toggle("show");
            });

            // 회원정보수정 클릭 시 edit-profile 페이지로 이동 (첫 번째 li)
            const profileEdit = dropdown.querySelector("li:nth-child(1)");
            if (profileEdit) {
                profileEdit.addEventListener("click", function() {
                    window.location.href = "../edit-profile/edit-profile.html";
                });
            }

            // 비밀번호수정 클릭 시 edit-password 페이지로 이동 (두 번째 li)
            const passwordEdit = dropdown.querySelector("li:nth-child(2)");
            if (passwordEdit) {
                passwordEdit.addEventListener("click", function() {
                    window.location.href = "../edit-password/edit-password.html";
                });
            }

            // 로그아웃 클릭 시 로그아웃 처리 (세 번째 li)
            const logout = dropdown.querySelector("li:nth-child(3)");
            if (logout) {
                logout.addEventListener("click", function() {
                    alert("로그아웃");
                });
            }
        } else {
            console.error("Navbar 요소를 찾을 수 없음");
        }
    }

    // 드롭다운 닫기 기능 (클릭 시)
    document.addEventListener("click", function() {
        const dropdown = document.getElementById("dropdownMenu");
        if (dropdown && dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
    });

    // 페이지 로드 시 네비게이션 바 로드
    loadNavbar();

    // 뒤로가기 함수를 전역에서 사용할 수 있도록 window에 바인딩 (HTML inline onclick="goBack(event)" 때문에)
    window.goBack = goBack;
});
