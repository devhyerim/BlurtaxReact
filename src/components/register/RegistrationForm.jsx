import React, { useState } from "react";

function RegistrationForm() {
  const [mailType, setMailType] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
    ssnFirst: "",
    ssnLast: "",
  });

  const handlePasswordBlur = (e) => {
    const password = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: password,
    }));
  };

  const handlePasswordCheckBlur = (e) => {
    const passwordCheck = e.target.value;
    setPasswordMatch(formData.password === passwordCheck);
  };
  const handleMailTypeChange = (event) => {
    setMailType(event.target.value);
    setEmailAddress(""); // Reset email address when mail type changes
  };
  const handleSubmit = () => {
    console.log(formData);
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입되었습니다!!!");
  };

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="pagewidth col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex justify-content-center py-4">
            <a
              href="../main/mainTA"
              className="logo d-flex align-items-center w-auto"
            >
              <img src="assets/img/logo.png" alt="" />
              <span className="d-none d-lg-block">BlurTax.</span>
            </a>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <div className="pt-4 pb-2">
              <h5 className="card-title text-center pb-0 fs-4">회원가입</h5>
              <p className="text-center small">회원 정보를 입력해주세요</p>
            </div>
            <div className="col-12">
              이름
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                required
              />
              <div className="invalid-feedback" hidden>
                이름을 입력하세요!
              </div>
            </div>
            <div className="col-12">
              아이디
              <input
                type="text"
                name="ID"
                className="form-control"
                id="userid"
                required
              />
              <div className="invalid-feedback" hidden>
                아이디를 입력하세요!
              </div>
            </div>
            <div className="col-12">
              이메일
              <div className="input-group has-validation">
                <input
                  type="text"
                  name="emailId"
                  className="emailId form-control"
                  id="username"
                  required
                />
                <span className="dash input-group-text" id="domain">
                  @
                </span>
                <select
                  className="mailType form-select"
                  value={mailType}
                  onChange={handleMailTypeChange}
                  required
                >
                  <option value="" disabled>
                    이메일을 선택하세요
                  </option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="other">다른 메일 입력</option>
                </select>
                {mailType === "other" && (
                  <input
                    type="text"
                    name="email"
                    className="emailAdress form-control"
                    value={emailAddress}
                    onChange={(event) => setEmailAddress(event.target.value)}
                    required
                  />
                )}
                <button
                  type="button"
                  className="authentication btn btn-outline-primary"
                >
                  이메일 인증
                </button>
                <div className="invalid-feedback" hidden>
                  이메일을 선택하세요!
                </div>
              </div>
            </div>

            <div className="col-12">
              비밀번호
              <input
                type="password"
                name="password"
                className="password form-control"
                onBlur={handlePasswordBlur}
                required
              />
              <div className="invalid-feedback" hidden>
                비밀번호를 입력하세요!
              </div>
            </div>
            <div className="col-12">
              비밀번호 확인
              <input
                type="password"
                name="passwordCheck"
                className="passwordcheck form-control"
                onBlur={handlePasswordCheckBlur}
                disabled={!formData.password}
                required
              />
              <div className="pwckvalid valid-feedback" hidden>
                비밀번호가 일치합니다!
              </div>
              {!passwordMatch && (
                <div className="pwckInvalid invalid-feedback">
                  비밀번호가 일치하지 않습니다
                </div>
              )}
            </div>
            <div className="col-12">
              주민등록번호
              <div className="input-group has-validation">
                <input
                  type="text"
                  name="SSN-first"
                  className="form-control"
                  id="SSN-first"
                  required
                />
                <span className="input-group-text" id="domain">
                  -
                </span>
                <input
                  type="text"
                  name="SSN-last"
                  className="form-control"
                  id="SSN-last"
                  required
                />
              </div>
              <div className="invalid-feedback" hidden>
                주민번호를 입력하세요!
              </div>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="terms"
                  type="checkbox"
                  value=""
                  id="acceptTerms"
                  required
                />
                <label className="form-check-label">
                  정보 제공에 동의합니다
                </label>
                <div className="invalid-feedback" hidden>
                  정보 제공에 동의하세요!
                </div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100" onClick={handleSubmit}>
                회원가입
              </button>
            </div>
            <div className="col-12">
              <p className="small mb-0">
                이미 아이디가 있으십니까? <a href="../main/talogin">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistrationForm;
