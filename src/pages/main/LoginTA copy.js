
const LoginTA = () => {
  return(
    <div>
      <main>
        <div class="container">

          <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div class="d-flex justify-content-center py-4">
                    <a href="index.html" class="logo d-flex align-items-center w-auto">
                      <img src="/img/logo.png" alt=""/>
                      <span class="d-none d-lg-block">BlurTax Login</span>
                    </a>
                  </div>

                  <div class="card mb-3">

                    <div class="card-body">

                      <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p class="text-center small">Enter your username & password to login</p>
                      </div>

                      <form role="form" class="row g-3 needs-validation" method="post" action="/login">

                        <div class="col-12">
                          <label for="yourUsername" class="form-label">아이디</label>
                          <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" name="username" class="form-control" id="yourUsername" required/>
                            <div class="invalid-feedback">아이디를 입력하세요.</div>
                          </div>
                        </div>

                        <div class="col-12">
                          <label for="yourPassword" class="form-label">비밀번호</label>
                          <input type="password" name="password" class="form-control" id="yourPassword" required/>
                          <div class="invalid-feedback">비밀번호를 입력하세요.</div>
                        </div>

                        <div class="col-12">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                            <label class="form-check-label" for="rememberMe">자동 로그인</label>
                          </div>
                        </div>
                        <div class="col-12">
                          <button class="btn btn-primary w-100" type="submit">로그인</button>
                        </div>
                        <div class="col-12">
                        <div class="loginoption">
                          <p class="small mb-0">계정이 없으신가요? <a href="../register/registerta">계정 만들기</a></p>
                          <div class="findInfo">
                          <p class="small mb-0">
                            <a target="_blank" id="idinquiry" href="" style={{color: "black", textalign: "center"}}>아이디 찾기</a> │
                            <a target="_blank" id="pwinquiry" href="" style={{color: "black", textalign: "center"}}>비밀번호 찾기</a>
                          </p>
                        </div>
                        </div>
                        </div>
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                      </form>

                    </div>
                  </div>

                </div>
              </div>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default LoginTA;