import { validateEmail, validateLoginPassword } from "../validator/validationUser";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const submitButton = document.getElementById("loginBtn");

    emailInput.addEventListener("input", () => validateEmail(emailInput));
    passwordInput.addEventListener("input", () => validateLoginPassword(passwordInput));

    if(form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const isValidEmail = validateEmail(emailInput);
            const isValidPassword = validateLoginPassword(passwordInput);

            if (isValidEmail && isValidPassword) {
                submitButton.style.backgroundColor = "#7F6AEE";
                fetch("../data/user.json")
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("네트워크 응답에 문제가 있습니다.");
                        }
                        return response.json();
                    })
                    .then(userData => {
                        if(
                            userData.email == emailInput.value &&
                            userData.password == passwordInput.value
                        ) {
                            console.log("로그인 성공");
                            alert("로그인 성공!");
                        } else {
                            console.log("로그인 실패 : 일치하는 정보 없음");
                            alert("이메일 또는 비밀번호가 올바르지 않습니다.");
                        }
                    })
                    .catch(error => {
                        console.error("사용자 데이터를 불러오는 중 오류 발생:", error);
                        alert("로그인 중 오류가 발생했습니다.");
                    });
                    
                
            }
        });
    }

    // 회원가입 화면으로 이동하는 버튼 클릭 이벤트
    document.getElementById("signupGoBtn").addEventListener("click", function() {
        window.location.href = "../signup/signup.html";
    });
});


