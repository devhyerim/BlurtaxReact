import { useState } from "react";
import axios
 from "axios";
const LoginTA = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/login'
      , { username, password },{ 
        withCredentials: true,
      });
      console.log("로그인 확인***********" + response);
    } catch (error) {
        alert('로그인에 실패했습니다.');
    }
};


  return(
    <div>
      <main>
        <div className="container">

          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="d-flex justify-content-center py-4">
                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                      <img src="/img/logo.png" alt=""/>
                      <span className="d-none d-lg-block">BlurTax Login</span>
                    </a>
                  </div>

                  <div className="card mb-3">

                    <div className="card-body">

                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p className="text-center small">Enter your username & password to login</p>
                      </div>

                      <form role="form" className="row g-3 needs-validation">

                        <div className="col-12">
                          <label for="yourUsername" className="form-label">아이디</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input 
                              type="text" 
                              name="username" 
                              className="form-control" 
                              id="yourUsername"
                              value={username}
                              onChange={(e)=>setUsername(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">아이디를 입력하세요.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label for="yourPassword" className="form-label">비밀번호</label>
                          <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            id="yourPassword" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                          />
                          <div className="invalid-feedback">비밀번호를 입력하세요.</div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                            <label className="form-check-label" for="rememberMe">자동 로그인</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button 
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleLogin}
                          >
                            로그인
                          </button>
                        </div>
                        <div className="col-12">
                        <div className="loginoption">
                          <p className="small mb-0">계정이 없으신가요? <a href="../register/registerta">계정 만들기</a></p>
                          <div className="findInfo">
                          <p className="small mb-0">
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