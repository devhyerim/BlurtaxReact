
// 조회버튼 클릭시 통장내역 조회
$(function(){
		// 화면 처음 로딩 하자마자 기업 리스트 출력

		// 툴팁설정
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		  return new bootstrap.Tooltip(tooltipTriggerEl)
		})
		
		// 일자, 수임사 선택 후 조회 시
		// form을 submit 할 때 Ajax 요청을 보내도록 처리
        $("#searchHistorySlip").on("click", function(event){
            let startDate = $("#startdate").val();
            let endDate = $("#enddate").val();
            let bizno = $("#bizno").val();
            let bankname = $("#bankname").val();
            
            let search = {
                startdate: startDate,
                enddate: endDate,
                bizno: bizno,
                bankname: bankname
            };
            
           historySlipRequest(search);
        });

 
		// 전표 내역 중 분개내역조회 버튼 클릭 시 조회
		$("#right").on("click", "#detailslipshow", function(){
			// 체크된 체크박스 값을 저장할 배열
			let selectedBhnoList = [];
			
			// 각 체크박스를 순회하면서 체크된 체크박스의 bhno 값을 배열에 저장
		    $('.form-check-input:checked').each(function() {
		      let bhnoValue = $(this).closest('tr').find('[name="bhno"]').val();
		      if (bhnoValue) {
		        selectedBhnoList.push(bhnoValue);
		      }
		    });
			
		    // 배열에 저장된 체크된 체크박스의 bhno 값을 URL 파라미터로 사용하여 분개내역조회 페이지로 이동
		    if (selectedBhnoList.length > 0) {
		    	getDetailSlip(selectedBhnoList);
		    }
			
		});
		
		// 분개내역 수정 후 저장 시 ajax 호출
		$("#bottom").on("click", "#modifyslipbtn", function(){
			 	let detailSlipList = []; // 저장할 DetailSlipVO 객체들을 담을 배열

			    // detailSlips 배열에 필요한 데이터를 넣어준다.
			    $('.detailsliptable tbody tr').each(function() {
			    	
			        let detailSlip = {
			            bankslipno: $(this).find('[name="bankslipno"]').val(),
			            bhno: $(this).find('[name="bhno"]').val(),
			            sortno: $(this).find('[name="sortno"]').val(),
			            accountno: $(this).find('[name="accountno"]').val(),
			            accountname: $(this).find('[name="accountname"]').val(),
			            // -나 ,부분 빼고 int로 변경
			            amount: parseInt($(this).find('[name="amount"]').val().replace(/,/g, '')),
			            source: $(this).find('[name="source"]').val(),
			            summary: $(this).find('[name="summary"]').val()
			        };

			        detailSlipList.push(detailSlip);
			    });

			    // AJAX로 업데이트 요청을 보낸다.
			    updateDetailSlips(detailSlipList);
			    
			    alert("저장이 완료되었습니다.");
			    
			    // 다시 화면 랜더링
			    let startDate = $("#startdate").val();
	            let endDate = $("#enddate").val();
	            let bizno = $("#bizno").val();
	            let bankname = $("#bankname").val();
	            
	            let search = {
	                startdate: startDate,
	                enddate: endDate,
	                bizno: bizno,
	                bankname: bankname
	            };
	            
	           historySlipRequest(search);
		});
		

		// 분개전표 수정
		function updateDetailSlips(detailSlipList) {
		    $.ajax({
		        type: "POST",
		        contentType: "application/json;charset=UTF-8",
		        url: "/bank/updateDetailSlips",
		        data: JSON.stringify(detailSlipList),
		        dataType: "json",
		        success: function(response) {
		            // 성공적으로 업데이트가 완료되면 안내
		            alert(response);
		        }
		    });
		}
	
		
		
		// 분개전표 내용 입력 후 저장 시 입력 처리 후 다시 화면으로
		$("#bottom").on("click", "#insertSlipBtn", function(){

			let detailSlipList = []; // 저장할 DetailSlipVO 객체들을 담을 배열

		    // detailSlips 배열에 필요한 데이터를 넣어준다.
		    $('.detailsliptable tbody tr').each(function() {
		        let detailSlip = {
		            bhno: $(this).find('[name="bhno"]').val(),
		            sortno: $(this).find('[name="sortno"]').val(),
		            accountno: $(this).find('[name="accountno"]').val(),
		            // -나 ,부분 빼고 int로 변경
		            amount: parseInt($(this).find('[name="amount"]').val().replace(/,/g, '').replace('-', '')),
		            summary: $(this).find('[name="summary"]').val()
		        };

		        detailSlipList.push(detailSlip);
		   });
			
			let message = '';
			
		    // AJAX 호출
		    $.ajax({
		      type: "POST",
		      url: "/bank/insertdetailslips", // 컨트롤러의 URL
		      contentType: "application/json", // 전송할 데이터의 타입 (JSON)
		      data: JSON.stringify(detailSlipList), // JSON 형태로 변환하여 전송
		      success: function (response) {
		        message = response; // 결과 메시지를 알림으로 보여줌
		      },
		      error: function (xhr, status, error) {
		        // 에러 발생 시 실행할 함수
		        alert("Error occurred: " + error); // 에러 메시지를 알림으로 보여줌
		      },
		    });
		    
		    // insert 성공 시 알림창
		    alert("저장되었습니다.");
		    
	     	let startDate = $("#startdate").val();
            let endDate = $("#enddate").val();
            let bizno = $("#bizno").val();
            let bankname = $("#bankname").val();
            
            let search = {
                startdate: startDate,
                enddate: endDate,
                bizno: bizno,
                bankname: bankname
            };
            
           historySlipRequest(search);
	    });	
		
		// 확정취소 ('1001'로 상태변경)
		$("#right").on("click", "#cancelcertainslip", function(){
			// 체크된 체크박스를 찾아서 처리
			 $("#pills-certain").find("input[type='checkbox']:checked").each(function() {
			    
				// 클릭한 행의 bhno
			    let bhno = $(this).closest("tr").find("input[name='bhno']").val();
			    let bhstateno = '1001';
				
			    // 서버에 POST 요청 보내기
			    $.ajax({
			      type: "POST",
			      url: "/bank/modifySlipState",
			      contentType: "application/json;charset=UTF-8",
			      data: JSON.stringify({bhno: bhno, bhstateno: bhstateno}),
			      dataType: "json",
			      success: function(response) {
			    	 let message = response.message;
			    	 console.log(message);
			         alert(message);
			      },
		            error: function(xhr, status, error) {
		                console.log("Error:", xhr.responseText);
		                //alert("전표 상태 수정에 실패하였습니다.");
		            }
			    });//end ajax
			    
			    alert("전표 상태 변경이 완료되었습니다.");
			    
			    // 상태 수정 이후 다시 랜더링
			    let startDate = $("#startdate").val();
	            let endDate = $("#enddate").val();
	            let bizno = $("#bizno").val();
	            let bankname = $("#bankname").val();
	            
	            let search = {
	                startdate: startDate,
	                enddate: endDate,
	                bizno: bizno,
	                bankname: bankname
	            };
	            
	           historySlipRequest(search);

			 });
		});
		
		// 확정 ('1002'로 상태변경)
		$("#right").on("click", "#certainslip", function(){
			// 체크된 체크박스를 찾아서 처리
			 $("#pills-can").find("input[type='checkbox']:checked").each(function() {
			    
				// 클릭한 행의 bhno
			    let bhno = $(this).closest("tr").find("input[name='bhno']").val();
			    let bhstateno = '1002';
				
			    // 서버에 POST 요청 보내기
			    $.ajax({
			      type: "POST",
			      url: "/bank/modifySlipState",
			      contentType: "application/json;charset=UTF-8",
			      data: JSON.stringify({bhno: bhno, bhstateno: bhstateno}),
			      dataType: "json",
			      success: function(response) {
			    	 let message = response.message;
			    	 console.log(message);
			         alert(message);
			      },
		            error: function(xhr, status, error) {
		                console.log("Error:", xhr.responseText);
		                //alert("전표 상태 수정에 실패하였습니다.");
		            }
			    });//end ajax
			    
			    alert("전표 상태 변경이 완료되었습니다.");
			    
			    // 상태 수정 이후 다시 랜더링
			    let startDate = $("#startdate").val();
	            let endDate = $("#enddate").val();
	            let bizno = $("#bizno").val();
	            let bankname = $("#bankname").val();
	            
	            let search = {
	                startdate: startDate,
	                enddate: endDate,
	                bizno: bizno,
	                bankname: bankname
	            };
	            
	           historySlipRequest(search);

			 });
		});
		
		// 제외 ('1004'로 상태변경)
		$("#right").on("click", "#exceptslip", function(){
			// 체크된 체크박스를 찾아서 처리
			// 확정 가능 탭에서
			 $("#pills-can").find("input[type='checkbox']:checked").each(function() {
			    
				// 클릭한 행의 bhno
			    let bhno = $(this).closest("tr").find("input[name='bhno']").val();
			    let bhstateno = '1004';
				
			    // 서버에 POST 요청 보내기
			    $.ajax({
			      type: "POST",
			      url: "/bank/modifySlipState",
			      contentType: "application/json;charset=UTF-8",
			      data: JSON.stringify({bhno: bhno, bhstateno: bhstateno}),
			      dataType: "json",
			      success: function(response) {
			    	 let message = response.message;
			    	 console.log(message);
			         alert(message);
			      },
		            error: function(xhr, status, error) {
		                console.log("Error:", xhr.responseText);
		                //alert("전표 상태 수정에 실패하였습니다.");
		            }
			    });//end ajax
			    
			    alert("전표 상태 변경이 완료되었습니다.");
			    
			    // 상태 수정 이후 다시 랜더링
			    let startDate = $("#startdate").val();
	            let endDate = $("#enddate").val();
	            let bizno = $("#bizno").val();
	            let bankname = $("#bankname").val();
	            
	            let search = {
	                startdate: startDate,
	                enddate: endDate,
	                bizno: bizno,
	                bankname: bankname
	            };
	            
	           historySlipRequest(search);

			 });
		});//end 제외
		
		// 삭제 ('1005'로 상태변경)
		$("#right").on("click", "#removeslip", function(){
			// 체크된 체크박스를 찾아서 처리
			// 확정 가능 탭에서
			 $("#pills-can").find("input[type='checkbox']:checked").each(function() {
			    
				// 클릭한 행의 bhno
			    let bhno = $(this).closest("tr").find("input[name='bhno']").val();
			    let bhstateno = '1005';
				
			    // 서버에 POST 요청 보내기
			    $.ajax({
			      type: "POST",
			      url: "/bank/modifySlipState",
			      contentType: "application/json;charset=UTF-8",
			      data: JSON.stringify({bhno: bhno, bhstateno: bhstateno}),
			      dataType: "json",
			      success: function(response) {
			    	 let message = response.message;
			    	 console.log(message);
			         alert(message);
			      },
		            error: function(xhr, status, error) {
		                console.log("Error:", xhr.responseText);
		                //alert("전표 상태 수정에 실패하였습니다.");
		            }
			    });//end ajax
			    
			    alert("전표 상태 변경이 완료되었습니다.");
			    
			    // 상태 수정 이후 다시 랜더링
			    let startDate = $("#startdate").val();
	            let endDate = $("#enddate").val();
	            let bizno = $("#bizno").val();
	            let bankname = $("#bankname").val();
	            
	            let search = {
	                startdate: startDate,
	                enddate: endDate,
	                bizno: bizno,
	                bankname: bankname
	            };
	            
	           historySlipRequest(search);

			 });
		});//end 삭제
	
		// 제외취소 ('1001'로 상태변경)
		$("#right").on("click", "#cancelexceptslip", function(){
			// 체크된 체크박스를 찾아서 처리
			// 확정 가능 탭에서
			 $("#pills-except").find("input[type='checkbox']:checked").each(function() {
			    
				// 클릭한 행의 bhno
			    let bhno = $(this).closest("tr").find("input[name='bhno']").val();
			    let bhstateno = '1001';
				
			    // 서버에 POST 요청 보내기
			    $.ajax({
			      type: "POST",
			      url: "/bank/modifySlipState",
			      contentType: "application/json;charset=UTF-8",
			      data: JSON.stringify({bhno: bhno, bhstateno: bhstateno}),
			      dataType: "json",
			      success: function(response) {
			    	 let message = response.message;
			    	 console.log(message);
			         alert(message);
			      },
		            error: function(xhr, status, error) {
		                console.log("Error:", xhr.responseText);
		                //alert("전표 상태 수정에 실패하였습니다.");
		            }
			    });//end ajax
			    
			    alert("전표 상태 변경이 완료되었습니다.");
			    
			    // 상태 수정 이후 다시 랜더링
			    let startDate = $("#startdate").val();
	            let endDate = $("#enddate").val();
	            let bizno = $("#bizno").val();
	            let bankname = $("#bankname").val();
	            
	            let search = {
	                startdate: startDate,
	                enddate: endDate,
	                bizno: bizno,
	                bankname: bankname
	            };
	            
	           historySlipRequest(search);

			 });
		});//end 제외취소

		// 삭제취소 ('1001'로 상태변경)
		$("#right").on("click", "#cancelremoveslip", function(){
			// 체크된 체크박스를 찾아서 처리
			// 확정 가능 탭에서
			 $("#pills-remove").find("input[type='checkbox']:checked").each(function() {
			    
				// 클릭한 행의 bhno
			    let bhno = $(this).closest("tr").find("input[name='bhno']").val();
			    let bhstateno = '1001';
				
			    // 서버에 POST 요청 보내기
			    $.ajax({
			      type: "POST",
			      url: "/bank/modifySlipState",
			      contentType: "application/json;charset=UTF-8",
			      data: JSON.stringify({bhno: bhno, bhstateno: bhstateno}),
			      dataType: "json",
			      success: function(response) {
			    	 let message = response.message;
			    	 console.log(message);
			         alert(message);
			      },
		            error: function(xhr, status, error) {
		                console.log("Error:", xhr.responseText);
		                //alert("전표 상태 수정에 실패하였습니다.");
		            }
			    });//end ajax
			    
			    alert("전표 상태 변경이 완료되었습니다.");
			    
			    // 상태 수정 이후 다시 랜더링
			    let startDate = $("#startdate").val();
	            let endDate = $("#enddate").val();
	            let bizno = $("#bizno").val();
	            let bankname = $("#bankname").val();
	            
		            let search = {
	                startdate: startDate,
	                enddate: endDate,
	                bizno: bizno,
	                bankname: bankname
	            };
	            
	           historySlipRequest(search);

			 });
		});//end 삭제취소
		
		// select 구분 선택 시 해당하지 않는 td는 readonly로 변경하고 회색처리
	    $("#bottom").on("change", "select[name='sortno']", function(){
	        // 선택된 select 요소를 넘겨줌
	        handleSelectChange(this);
	    });

		// 통장 내역의 연결 전표 중 분개내역조회시
		$("#left").on("click", "#watchslipbtn", function(){
			// 체크된 체크박스 값을 저장할 배열
			let selectedBhnoList = [];
			
			// 각 체크박스를 순회하면서 체크된 체크박스의 bhno 값을 배열에 저장
		    $('.form-check-input:checked').each(function() {
		      let bhnoValue = $(this).closest('tr').find('[name="bhno"]').val();
		      if (bhnoValue) {
		        selectedBhnoList.push(bhnoValue);
		      }
		    });
			
		    // 배열에 저장된 체크된 체크박스의 bhno 값을 URL 파라미터로 사용하여 분개내역조회 페이지로 이동
		    if (selectedBhnoList.length > 0) {
		    	getDetailSlip(selectedBhnoList);
		    }
			
		});
	
		// 통장내역 전표 입력 버튼 클릭 시 거래처 가져오기
		$("#left").on("click", "#bankslipplzbtn", function(){
		    // 체크된 체크박스의 bhno 값을 저장할 배열
		    let selectedBhNos = [];
		
		    // 테이블의 tbody에서 체크된 체크박스를 찾아서 처리
		    $("#nonbanktable tbody").find("input[type='checkbox']:checked").each(function() {
		        // 클릭한 행의 bhno 값을 가져와 배열에 추가
		        let bhno = $(this).closest("tr").find("input[name='bhno']").val();
		        selectedBhNos.push(bhno);
		    });
		
		    // bhno 들을 서버에 전달해서 분개내역 테이블의 각 행에 bhno(hidden), 거래처명 전달
		    $.ajax({
		        type: "POST",
		        url: "/bank/getBankHistoryDetail",
		        contentType: "application/json;charset=UTF-8",
		        data: JSON.stringify(selectedBhNos), // 선택된 bhno 배열을 JSON으로 변환하여 전송
		        dataType: "json",
		        success: function(response) {
		        	// BankHistoryVO 리스트를 받아서 create 분개내역테이블 생성
		        	createBankToSlipTable(response);
		        },
		        error: function(xhr, status, error) {
		            console.error("Error while fetching data from server.");
		        }
		    });
		    
		});
		
		// 분개내역 resetbtn 버튼 클릭 시 리셋
		$("#bottom").on("click", "#resetbtn", function(){
		    // 테이블의 모든 input 요소
			let inputs = document.querySelectorAll(".detailsliptable input[type='text']");
		
			// 각 input 요소의 값 비우기
			inputs.forEach(input => {
    			input.value = "";
  			});
		});

		// 내용확인요청 시 모달출력
		$("#left").on("click", "#memoplzbtn", function(){
			
			 // 테이블의 tr 모두 가져오기
			 let tableRows = document.querySelectorAll("#nonbanktable tbody tr");
			 let selectedRow = null;
			 
			 for (const row of tableRows) {
			    const checkbox = row.querySelector("input[type='checkbox']");
			    if (checkbox.checked) {
			      selectedRow = row;
			      break;
			    }
			 }

			   if (!selectedRow) {
			   	  return;
			   }

			  // 선택한 행의 통장내역번호, 일자, 내용, 금액 가져오기
			  let bhno = selectedRow.querySelector("input[name='bhno']").value;
			  let bhdate = selectedRow.querySelector("td:nth-child(3)").textContent;
			  let source = selectedRow.querySelector("td:nth-child(4)").textContent;
			  let amount = selectedRow.querySelector(".amountin").textContent;

			  // 모달창의 요소
			  let dateInput = document.getElementById("bhdateinmodal");
			  let sourceInput = document.getElementById("sourceinmodal");
			  let amountInput = document.getElementById("amountinmodal");

			  dateInput.value = bhdate;
			  sourceInput.value = source;
			  amountInput.value = amount;

			  $("#memoplzmodal").modal("show");
		});
	
	   // 계정 조회 버튼 클릭
		$("#bottom").on("click", ".searchaccount", function(){
			
			// 버튼별로 동적 생성되는 인덱스값 가져오기: 시작 0 ~ 증가
			const btnIndex = $(this).data("btn-index");
		
			$.ajax({
				url: "/receipt/accountList",
				type: "GET",
				dataType: "json",
				success: function (data) {
					$("#accountListModal").empty();
					
					let accountList = data;
					let tableBody = $("#accountListModal");
					$.each(data, function (index, item) {
						let accountno = item.accountNo;
						const temp = document.createElement('tr');
						temp.innerHTML = "<td>" + item.accountNo + "</td><td>"
							+ item.accountName + "</td>";
						$('#accountListModal').append(temp);
					});
      				
      				$("#accountCode").modal("show");
      				
      		       // 이전에 등록된 클릭 이벤트 제거
      		       //- 제거하지 않으면 계정검색버튼 클릭시마다 모달창에 클릭 이벤트 계속 추가, 중복됨
      		       $("#accountListModal").off("click", "tr");
      				
      				// 모달 내에서 계정 클릭 시
      				$("#accountListModal").on("click", 'tr', function(){
      					  let selectedAccountNo = $(this).find('td:first-child').text();
		                  let selectedAccountName = $(this).find('td:nth-child(2)').text();

		                  // 버튼 인덱스를 이용하여 분개내역 테이블 내의 해당 버튼의 행을 선택
					      let targetRow = $('.detailsliptable tbody tr').eq(btnIndex);
					
					      targetRow.find('input[name="accountno"]').val(selectedAccountNo);
					      targetRow.find('input[name="accountname"]').val(selectedAccountName);

					      // 모달 창 닫기
					      $("#accountCode").modal("hide");
      				});
				},
				error: function (xhr, status, error) {
					console.log(error);
				}
			});
	 	 });

});// end windowload function


 	// 일자, 수임사 선택 후 조회 시 호출하는 ajax
 	// search: 호출하는 자바스크립트로부터 받아옴
    function historySlipRequest(search) {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            url: "/bank/getHistoryAndSlip",
            data: JSON.stringify(search),
            dataType: "json",
            success: function(response) {
                // 서버로부터 받은 데이터 처리
                let historyList = response.historyList;
                let slipList = response.slipList;
                let total = response.total;
                let all = response.all;
                let can = response.can;
                let confirmed = response.confirmed;
                let except = response.except;
                let remove = response.remove;
                
                createBankHistoryAllTable(historyList);
                createBankSlipAllTable(slipList, total, all, can, confirmed, except, remove);
                createDetailSlipTable();
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }// end historySlipRequest
        
       
    // 분개내역 조회시 호출하는 ajax 함수
    // bhnoList: 호출하는 자바스크립트로부터 받아옴
	function getDetailSlip(bhnoList) {
	  // 배열에 저장된 체크된 체크박스의 bhno 값을 URL 파라미터로 사용하여 분개내역조회 URL 생성
	  if (bhnoList.length > 0) {
	    // url 생성해서 넘겨주기
	    let queryString = bhnoList.map(bhno => 'bhno=' + bhno).join('&');
	    
	    $.ajax({
	      type: "GET",
	      contentType: "application/json;charset=UTF-8",
	      url: "/bank/detailslip?" + queryString,
	      dataType: "json",
	      success: function(response) {
	        // 성공적으로 데이터를 받아온 후 createDetailSlipTable 함수 호출
	        createDetailSlipTable(response);
	      },
	      error: function(xhr, status, error) {
	        console.error(error);
	      }
	    });//end ajax
	  }//end if
	}


	// historySlipRequest ajax가 호출하는 처리 함수
	function createBankHistoryAllTable(data){
		
		let searchstart = $('.left');

	  	searchstart.empty();
	  	
	let str = '';
	str += '<ul class="nav nav-tabs" id="myTab" role="tablist">';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link active" id="allbanklist-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">전체</button>';
	str += '</li>';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link" id="nonbanklist-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">전표미연결</button>';
	str += '</li>';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link" id="connbanklist-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">전표연결</button>';
	str += '</li>';
	str += '</ul>';
	str += '<div class="tab-content pt-2" id="myTabContent">';
	
	// 전체
	str += '<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="allbanklist-tab">';
	str += '<div class="banklogo">';
	str += '<img src="/resources/assets/img/shinhan.png" alt="Shinhan Bank" width="20" height="20">';
	str += '<button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">';
	str += '신한은행';
	str += '</button>';
	str += '<ul class="dropdown-menu">';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">국민은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">우리은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">농협은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">SC제일은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">KEB하나은행</a></li>';
	str += '</ul>';
	str += '</div>';
	str += '<table id="allbanktable" class="banktable table table-hover table-bordered">';
	str += '<thead>';
	str += '<tr>';
	str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	str += '<th scope="col" class="tabletop">날짜</th>';
	str += '<th scope="col" class="tabletop">적요</th>';
	str += '<th scope="col" class="tabletop">입금액</th>';
	str += '<th scope="col" class="tabletop">출금액</th>';
	str += '<th scope="col" class="tabletop">잔액</th>';
	str += '<th scope="col" class="tabletop">메모</th>';
	str += '</tr>';
	str += '</thead>';
	str += '<tbody>';
	
	if(data && data.length >0){
		for (let i = 0; i < data.length; i++) {
      	str +='<tr>';
      	str += '<input type="hidden" name="bhno" value="';
	    str += data[i].bhno;
	    str += '">';
 	  	str +='<td><input class="form-check-input" type="checkbox"></td>';
 	  	str +='<td>';
 	  	str += formatDate(data[i].bhdate);
 	  	str +='</td>';
 	  	str +='<td>';
 	  	str +=data[i].source;
 	  	str +='</td>';
 	  	if(data[i].sortno==1){
 	  		// 입금
 	  		str +='<td>';
	 	  	str +=formatNumberWithCommas(data[i].amount);
	 	  	str +='</td>';
	 	  	str +='<td></td>';
 	  	}else{
 	  		// 출금
 	  		str +='<td></td>';
 	  		str +='<td>';
	 	  	str +=formatNumberWithCommas(data[i].amount);
	 	  	str +='</td>';
 	  	}
 	  	str +='<td>';
 	  	str +=formatNumberWithCommas(data[i].sum);
 	  	str +='</td>';
	  	if(data[i].memo==null){
	  		 str +='<td><i class="ri-article-fill"></i></td>';
	  	}else{
	  		 str +='<td><a href=# data-bs-toggle="tooltip" data-bs-placement="top" title="';
	  		 str +=data[i].memo;
	  		 str +='"><i class="ri-article-fill"></i></a></td>';
	  	}
		str +='</tr>';
	  }
	}else{
	}
	
	str += '</tbody>';
	str += '</table>';
	str += '</div>';
	
	// 미연결
	str += '<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="nonbanklist-tab">';
	str += '<div class="banklogo">';
	str += '<img src="/resources/assets/img/shinhan.png" alt="Shinhan Bank" width="20" height="20">';
	str += '<button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">';
	str += '신한은행';
	str += '</button>';
	str += '<ul class="dropdown-menu">';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">국민은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">우리은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">농협은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">SC제일은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">KEB하나은행</a></li>';
	str += '</ul>';
	str += '</div>';
	str += '<table id="nonbanktable" class="banktable table table-hover table-bordered">';
	str += '<thead>';
	str += '<tr>';
	str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	str += '<th scope="col" class="tabletop">날짜</th>';
	str += '<th scope="col" class="tabletop">적요</th>';
	str += '<th scope="col" class="tabletop">입금액</th>';
	str += '<th scope="col" class="tabletop">출금액</th>';
	str += '<th scope="col" class="tabletop">잔액</th>';
	str += '<th scope="col" class="tabletop">메모</th>';
	str += '</tr>';
	str += '</thead>';
	str += '<tbody>';
	
	for (let i = 0; i < data.length; i++) {
		if(data[i].bhstatename=='미연결'){
	      	str +='<tr>';
	      	str += '<input type="hidden" name="bhno" value="';
	      	str += data[i].bhno;
	      	str += '">';
	 	  	str +='<td><input class="form-check-input" type="checkbox"></td>';
	 	  	str +='<td>';
	 	  	str +=formatDate(data[i].bhdate);
	 	  	str +='</td>';
	 	  	str +='<td>';
	 	  	str +=data[i].source;
	 	  	str +='</td>';
	 	  	if(data[i].sortno==1){
	 	  		// 입금
	 	  		str +='<td class="amountin">';
		 	  	str +=formatNumberWithCommas(data[i].amount);
		 	  	str +='</td>';
		 	  	str +='<td></td>';
	 	  	}else{
	 	  		// 출금
	 	  		str +='<td></td>';
	 	  		str +='<td class="amountin">';
		 	  	str +=formatNumberWithCommas(data[i].amount);
		 	  	str +='</td>';
	 	  	}
	 	  	str +='<td>';
	 	  	str +=formatNumberWithCommas(data[i].sum);
	 	  	str +='</td>';
		  	if(data[i].memo==null){
		  		 str +='<td><i class="ri-article-fill"></i></td>';
		  	}else{
		  		 str +='<td><a href=# data-bs-toggle="tooltip" data-bs-placement="top" title="';
		  		 str +=data[i].memo;
		  		 str +='"><i class="ri-article-fill"></i></a></td>';
		  	}
			str +='</tr>';
	 	 }
	}
	
	str += '</tbody>';
	str += '</table>';
	str += '<button type="button" id="bankslipplzbtn" class="btn btn-primary btn-small btnmarginright">전표입력</button>';
	str += '<button type="button" id="memoplzbtn" class="btn btn-primary btn-small">내용확인요청</button>';
	str += '</div>';
	
	// 연결
	str += '<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="connbanklist-tab">';
	str += '<div class="banklogo">';
	str += '<img src="/resources/assets/img/shinhan.png" alt="ShinhanBank" width="20" height="20">';
	str += '<button class="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">';
	str += '신한은행';
	str += '</button>';
	str += '<ul class="dropdown-menu">';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">국민은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">우리은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">농협은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">SC제일은행</a></li>';
	str += '<li><a class="dropdown-item" href="javascript:void(0);">KEB하나은행</a></li>';
	str += '</ul>';
	str += '</div>';
	str += '<table id="connbanktable" class="banktable table table-hover table-bordered">';
	str += '<thead>';
	str += '<tr>';
	str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	str += '<th scope="col" class="tabletop">날짜</th>';
	str += '<th scope="col" class="tabletop">적요</th>';
	str += '<th scope="col" class="tabletop">입금액</th>';
	str += '<th scope="col" class="tabletop">출금액</th>';
	str += '<th scope="col" class="tabletop">잔액</th>';
	str += '<th scope="col" class="tabletop">메모</th>';
	str += '</tr>';
	str += '</thead>';
	str += '<tbody>';
	
	for (let i = 0; i < data.length; i++) {
		if(data[i].bhstatename=='확정가능' || data[i].bhstatename=='확정'){
	      	str +='<tr>';
	      	str += '<input type="hidden" name="bhno" value="';
	      	str += data[i].bhno;
	      	str += '">';
	 	  	str +='<td><input class="form-check-input" type="checkbox"></td>';
	 	  	str +='<td>';
	 	  	str +=formatDate(data[i].bhdate);
	 	  	str +='</td>';
	 	  	str +='<td>';
	 	  	str +=data[i].source;
	 	  	str +='</td>';
	 	  	if(data[i].sortno==1){
	 	  		// 입금
	 	  		str +='<td>';
		 	  	str +=formatNumberWithCommas(data[i].amount);
		 	  	str +='</td>';
		 	  	str +='<td></td>';
	 	  	}else{
	 	  		// 출금
	 	  		str +='<td></td>';
	 	  		str +='<td>';
		 	  	str +=formatNumberWithCommas(data[i].amount);
		 	  	str +='</td>';
	 	  	}
	 	  	str +='<td>';
	 	  	str +=formatNumberWithCommas(data[i].sum);
	 	  	str +='</td>';
		  	if(data[i].memo==null){
		  		 str +='<td><i class="ri-article-fill"></i></td>';
		  	}else{
		  		 str +='<td><a href=# data-bs-toggle="tooltip" data-bs-placement="top" title="';
		  		 str +=data[i].memo;
		  		 str +='"><i class="ri-article-fill"></i></a></td>';
		  	}
			str +='</tr>';
	  }
	}
	
	str += '</tbody>';
	str += '</table>';
	str += '<button type="button" id="watchslipbtn" class="btn btn-primary btn-small">분개내역조회</button>';
	str += '</div>'; // 연결탭 끝
	str += '</div>';
	
	
	searchstart.html(str);
	
	// tooltip 초기화
	$('[data-bs-toggle="tooltip"]').tooltip();
	
	}//end 통장내역 조회


	// 전표내역 전체 조회 테이블 생성 함수
	function createBankSlipAllTable(slipList, total, all, can, confirmed, except, remove) {
	  let searchstart = $('.right');

	  searchstart.empty();
	  
	let str = '';
	str += '<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-home" aria-selected="true">';
	str += '<span class="button-text">전　　체</span><div class="howmany">';
	str += all;
	str += '</div></button>';
	str += '</li>';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link" id="pills-can-tab" data-bs-toggle="pill" data-bs-target="#pills-can" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">';
	str += '<span class="button-text">확정 가능</span><div class="howmany">';
	str += can;
	str += '</div></button>';
	str += '</li>';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link" id="pills-certain-tab" data-bs-toggle="pill" data-bs-target="#pills-certain" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">';
	str += '<span class="button-text">확　　정</span><div class="howmany">';
	str += confirmed;
	str += '</div></button>';
	str += '</li>';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link" id="pills-except-tab" data-bs-toggle="pill" data-bs-target="#pills-except" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">';
	str += '<span class="button-text">제　　외</span><div class="howmany">';
	str += except;
	str += '</div></button>';
	str += '</li>';
	str += '<li class="nav-item" role="presentation">';
	str += '<button class="nav-link" id="pills-remove-tab" data-bs-toggle="pill" data-bs-target="#pills-remove" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">';
	str += '<span class="button-text">삭　　제</span><div class="howmany">';
	str += remove;
	str += '</div></button>';
	str += '</li>';
	str += '</ul>';
	str += '<div class="tab-content pt-2" id="myTabContent">';
	str += '<div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="home-tab">';
	
	// 전체 탭
	str += '<table id="banksliptableAll" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
	  str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	  str += '<th scope="col" class="tabletop">거래처명</th>';
	  str += '<th scope="col" class="tabletop">전표적요</th>';
	  str += '<th scope="col" class="tabletop">상대계정</th>';
	  str += '<th scope="col" class="tabletop">상태</th>';
	  str += '<th scope="col" class="tabletop">예상잔액</th>';
	  str += '</tr></thead>';
	  str += '<tbody>';
	  
	  if(slipList && slipList.length>0){
	  		for(let i=0; i<slipList.length; i++){
				str += '<tr>';
			  	str += '<input type="hidden" name="bhno" value="';
			  	str += slipList[i].bhno;
			  	str += '"/>';
			  	str += '<td><input class="form-check-input" type="checkbox"></td>';
				str += '<td>';
			 	str += slipList[i].source;
			 	str += '</td>';
			 	if(slipList[i].summary==null){
			 		str += '<td>';
			 		str += '</td>';
			 	}else{
			 		str += '<td>';
			 		str += slipList[i].summary;
			 		str += '</td>';
			 	}
		
			 	str += '<td>';
			 	str += slipList[i].accountname;
			 	str += '</td>';
			 	
			 	if(slipList[i].bhstatename == '확정가능'){
			 	 	str += '<td style="color: #198754;">';
			 		str += slipList[i].bhstatename;
			 		str += '</td>';
			 	}else if(slipList[i].bhstatename == '확정'){
			 		str += '<td style="color: #4169E1;">';
			 		str += slipList[i].bhstatename;
			 		str += '</td>';
			 	}else if(slipList[i].bhstatename == '제외'){
			 		str += '<td style="color: #ffab00;">';
			 		str += slipList[i].bhstatename;
			 		str += '</td>';
			 	}else{
			 		str += '<td>';
			 		str += slipList[i].bhstatename;
			 		str += '</td>';
			 	}
			 	
			 	
			 	str += '<td>';
			 	str += formatNumberWithCommas(slipList[i].sum);
			 	str += '</td></tr>';
			}
	  }else{
	  }
	
	str += ' <tr>';
	str += '<td class="total"></td>';
	str += '<td class="total"><strong>합계</strong></td>';
	str += '<td class="total" colspan="4">잔액: ';
	if(total.totalsum!=null){
		str += formatNumberWithCommas(total.totalsum);
	}else{
		str += '';
	}
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	if(total.diffsum!=null){
		str += formatNumberWithCommas(total.diffsum);
		str += '</span></td>';
	}else{
		str += '</span></td>';
	}
	
	str += '</tr>';
	str +='</tbody></table>';
	str += '<button type="button" id="detailslipshow" class="btn btn-light btnmarginright">분개내역조회</button>';
	str += '</div>';
	
	// 확정가능 탭
	str += '<div class="tab-pane fade" id="pills-can" role="tabpanel" aria-labelledby="profile-tab">';
	str += '<table id="banksliptableCan" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
	  str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	  str += '<th scope="col" class="tabletop">거래처명</th>';
	  str += '<th scope="col" class="tabletop">전표적요</th>';
	  str += '<th scope="col" class="tabletop">상대계정</th>';
	  str += '<th scope="col" class="tabletop">상태</th>';
	  str += '<th scope="col" class="tabletop">예상잔액</th>';
	  str += '</tr></thead>';
	  str += '<tbody>';
	  
	  if(slipList && slipList.length>0){
	  		for(let i=0; i<slipList.length; i++){
	  			if(slipList[i].bhstatename=='확정가능'){
	  				str += '<tr>';
				  	str += '<input type="hidden" name="bhno" value="';
				  	str += slipList[i].bhno;
				  	str += '"/>';
				  	str += '<td><input class="form-check-input" type="checkbox"></td>';
					str += '<td>';
				 	str += slipList[i].source;
				 	str += '</td>';
				 	if(slipList[i].summary==null){
				 		str += '<td>';
				 		str += '</td>';
				 	}else{
				 		str += '<td>';
				 		str += slipList[i].summary;
				 		str += '</td>';
				 	}
			
				 	str += '<td>';
				 	str += slipList[i].accountname;
				 	str += '</td>';
				 	str += '<td>';
				 	str += slipList[i].bhstatename;
				 	str += '</td>';
				 	str += '<td>';
				 	str += formatNumberWithCommas(slipList[i].sum);
				 	str += '</td></tr>';

	  			}else{
	  			}//end if
			}//end for
	  }else{
	  }
	
	str += '<tr>';
	str += '<td class="total"></td>';
	str += '<td class="total"><strong>합계</strong></td>';
	str += '<td class="total" colspan="4">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '<button type="button" id="certainslip" class="btn btn-light btnmarginright">확정</button>';
	str += '<button type="button" id="detailslipshow" class="btn btn-light btnmarginright">분개내역조회</button>';
	str += '<button type="button" id="exceptslip" class="btn btn-light btnmarginright">제외</button>';
	str += '<button type="button" id="removeslip" class="btn btn-light btnmarginright">삭제</button>';
	str += '</div>';
	
	// 확정
	str += '<div class="tab-pane fade" id="pills-certain" role="tabpanel" aria-labelledby="contact-tab">';
	str += '<table id="banksliptableCertain" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
	  str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	  str += '<th scope="col" class="tabletop">거래처명</th>';
	  str += '<th scope="col" class="tabletop">전표적요</th>';
	  str += '<th scope="col" class="tabletop">상대계정</th>';
	  str += '<th scope="col" class="tabletop">상태</th>';
	  str += '<th scope="col" class="tabletop">예상잔액</th>';
	  str += '</tr></thead>';
	  str += '<tbody>';
	  
	  if(slipList && slipList.length>0){
	  		for(let i=0; i<slipList.length; i++){
	  			if(slipList[i].bhstatename=='확정'){
	  				str += '<tr>';
				  	str += '<input type="hidden" name="bhno" value="';
				  	str += slipList[i].bhno;
				  	str += '"/>';
				  	str += '<td><input class="form-check-input" type="checkbox"></td>';
					str += '<td>';
				 	str += slipList[i].source;
				 	str += '</td>';
				 	if(slipList[i].summary==null){
				 		str += '<td>';
				 		str += '</td>';
				 	}else{
				 		str += '<td>';
				 		str += slipList[i].summary;
				 		str += '</td>';
				 	}
			
				 	str += '<td>';
				 	str += slipList[i].accountname;
				 	str += '</td>';
				 	str += '<td>';
				 	str += slipList[i].bhstatename;
				 	str += '</td>';
				 	str += '<td>';
				 	str += formatNumberWithCommas(slipList[i].sum);
				 	str += '</td></tr>';

	  			}else{
	  			}//end if
			}//end for
	  }else{
	  }
	
	str += '<tr>';
	str += '<td class="total"></td>';
	str += '<td class="total"><strong>합계</strong></td>';
	str += '<td class="total" colspan="4">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '<button type="button" id="cancelcertainslip" class="btn btn-light btnmarginright">확정취소</button>';
	str += '<button type="button" id="detailslipshow" class="btn btn-light btnmarginright">분개내역조회</button>';
	str += '</div>';
	
	// 제외
	str += '<div class="tab-pane fade" id="pills-except" role="tabpanel" aria-labelledby="contact-tab">';
	str += '<table id="banksliptableExcept" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
	  str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	  str += '<th scope="col" class="tabletop">거래처명</th>';
	  str += '<th scope="col" class="tabletop">전표적요</th>';
	  str += '<th scope="col" class="tabletop">상대계정</th>';
	  str += '<th scope="col" class="tabletop">상태</th>';
	  str += '<th scope="col" class="tabletop">예상잔액</th>';
	  str += '</tr></thead>';
	  str += '<tbody>';
	  
	  if(slipList && slipList.length>0){
	  		for(let i=0; i<slipList.length; i++){
	  			if(slipList[i].bhstatename=='제외'){
	  				str += '<tr>';
				  	str += '<input type="hidden" name="bhno" value="';
				  	str += slipList[i].bhno;
				  	str += '"/>';
				  	str += '<td><input class="form-check-input" type="checkbox"></td>';
					str += '<td>';
				 	str += slipList[i].source;
				 	str += '</td>';
				 	if(slipList[i].summary==null){
				 		str += '<td>';
				 		str += '</td>';
				 	}else{
				 		str += '<td>';
				 		str += slipList[i].summary;
				 		str += '</td>';
				 	}
			
				 	str += '<td>';
				 	str += slipList[i].accountname;
				 	str += '</td>';
				 	str += '<td>';
				 	str += slipList[i].bhstatename;
				 	str += '</td>';
				 	str += '<td>';
				 	str += formatNumberWithCommas(slipList[i].sum);
				 	str += '</td></tr>';

	  			}else{
	  			}//end if
			}//end for
	  }else{
	  }
	
	str += '<tr>';
	str += '<td class="total"></td>';
	str += '<td class="total"><strong>합계</strong></td>';
	str += '<td class="total" colspan="4">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '<button type="button" id="cancelexceptslip" class="btn btn-light btnmarginright">제외취소</button>';
	str += '<button type="button" id="detailslipshow" class="btn btn-light btnmarginright">분개내역조회</button>';
	str += '</div>';
	
	// 삭제
	str += '<div class="tab-pane fade" id="pills-remove" role="tabpanel" aria-labelledby="contact-tab">';
	str += '<table id="banksliptableCancel" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
	  str += '<th scope="col" class="tabletop"><input class="form-check-input" type="checkbox"></th>';
	  str += '<th scope="col" class="tabletop">거래처명</th>';
	  str += '<th scope="col" class="tabletop">전표적요</th>';
	  str += '<th scope="col" class="tabletop">상대계정</th>';
	  str += '<th scope="col" class="tabletop">상태</th>';
	  str += '<th scope="col" class="tabletop">예상잔액</th>';
	  str += '</tr></thead>';
	  str += '<tbody>';
	  
	  if(slipList && slipList.length>0){
	  		for(let i=0; i<slipList.length; i++){
	  			if(slipList[i].bhstatename=='삭제'){
	  				str += '<tr>';
				  	str += '<input type="hidden" name="bhno" value="';
				  	str += slipList[i].bhno;
				  	str += '"/>';
				  	str += '<td><input class="form-check-input" type="checkbox"></td>';
					str += '<td>';
				 	str += slipList[i].source;
				 	str += '</td>';
				 	if(slipList[i].summary==null){
				 		str += '<td>';
				 		str += '</td>';
				 	}else{
				 		str += '<td>';
				 		str += slipList[i].summary;
				 		str += '</td>';
				 	}
			
				 	str += '<td>';
				 	str += slipList[i].accountname;
				 	str += '</td>';
				 	str += '<td>';
				 	str += slipList[i].bhstatename;
				 	str += '</td>';
				 	str += '<td>';
				 	str += formatNumberWithCommas(slipList[i].sum);
				 	str += '</td></tr>';

	  			}else{
	  			}//end if
			}//end for
	  }else{
	  }
	
	str += '<tr>';
	str += '<td class="total"></td>';
	str += '<td class="total"><strong>합계</strong></td>';
	str += '<td class="total" colspan="4">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '<button type="button" id="cancelremoveslip" class="btn btn-light btnmarginright">삭제취소</button>';
	str += '<button type="button" id="detailslipshow" class="btn btn-light btnmarginright">분개내역조회</button>';
	str += '</div>';
	str += '</div>';
	  

	searchstart.html(str);	              

	}//end of createBankSlipAllTable


	
	// 처음 로딩 or 분개내역이 있는 경우 분개내역 조회 테이블 생성 함수
	function createDetailSlipTable(detailSlip) {
	  let searchstart = $('.bottom');

	  searchstart.empty();
	  
		let str = '';
	    str += '<table class="table detailsliptable table-bordered">';
		str += '<thead>';
		str += '<tr>';
		str += '<th scope="col" class="tabletop">구분</th>';
		str += '<th colspan="2" scope="col" class="tabletop">계정과목</th>';
		str += '<th scope="col" class="tabletop">차변</th>';
		str += '<th scope="col" class="tabletop">대변</th>';
		str += '<th scope="col" class="tabletop">거래처명</th>';
		str += '<th scope="col" class="tabletop">적요</th>';
		str += '</tr>';
		str += '</thead>';
		str += '<tbody>';
		
		 if(detailSlip && detailSlip.length>0){
	  		for(let i=0; i<detailSlip.length; i++){
	  			str += '<tr>';
	  			str += '<input type="hidden" name="bankslipno" value="';
	  			str += detailSlip[i].bankslipno;
	  			str += '" />'
	  			str += '<input type="hidden" name="bhno" value="';
	  			str += detailSlip[i].bhno;
	  			str += '">';
				str += '<td>';
				str += '<select class="form-select" name="sortno" aria-label="Default select example">';
				
				// 가져온 분개전표의 sortno에 따라 달라지는 select문
				if (detailSlip[i].sortno == 1) {
				  str += '<option value="1" selected>입금</option>';
				} else {
				  str += '<option value="1">입금</option>';
				}
				
				if (detailSlip[i].sortno == 2) {
				  str += '<option value="2" selected>출금</option>';
				} else {
				  str += '<option value="2">출금</option>';
				}
				
				if (detailSlip[i].sortno == 3) {
				  str += '<option value="3" selected>차변</option>';
				} else {
				  str += '<option value="3">차변</option>';
				}
				
				if (detailSlip[i].sortno == 4) {
				  str += '<option value="4" selected>대변</option>';
				} else {
				  str += '<option value="4">대변</option>';
				}

				str += '</select>';
				str += '</td>';
				str += '<td class="button-and-input"><button type="button" class="btn searchaccount btn-outline-dark" ';
				str += 'data-bs-toggle="modal" data-bs-target="#accountCode" ';
				str += 'data-btn-index="';
				str += i;
				str += '">';
				str += '<i class="ri-article-fill"></i>';
				str += '</button><input type="text" name="accountno" class="intable" value="';
				str += detailSlip[i].accountno;
				str += '"></td>';
				str += '<td><input type="text" name="accountname" class="intable" value="';
				str += detailSlip[i].accountname;
				str += '"></td>';
				
				// 출금, 차변이면
				if(detailSlip[i].sortno == 3 || detailSlip[i].sortno == 2){
					// 첫번째 amount 칸에 값 입력
					str += '<td><input type="text" name="amount" class="intable" value="';
					str += formatNumberWithCommas(Math.abs(detailSlip[i].amount));
					str += '"></td>';
					str += '<td class="cantwrite"><input type="text" class="intable cantwrite" readonly="readonly"></td>';
				}else{
					// 입금, 대변이면 두번째 칸에 값 입력
					str += '<td class="cantwrite"><input type="text" class="intable cantwrite" readonly="readonly"></td>';
					str += '<td><input type="text" name="amount" class="intable" value="';
					str += formatNumberWithCommas(Math.abs(detailSlip[i].amount));
					str += '"></td>';
					
				}
				
				str += '<td><input type="text" name="source" class="intable" value="';
				str += detailSlip[i].source;
				str += '"></td>';
				str += '<td><input type="text" name="summary" class="intable" value="';
				
				if(detailSlip[i].summary==null){
					str += '"></td>';
				}else{
					str += detailSlip[i].summary + '"></td>';
				}
				
				str += '</tr>';
	  		}//end for
	  		
	  		str += '</tbody>';
			str += '</table>';
	  		str += '<button type="button" class="btn btn-primary btnmarginright" id="modifyslipbtn">저장</button>';
	  		str += '<button type="button" class="btn btn-outline-secondary" id="resetbtn">취소</button>';
	  	 }else{
	  	 
	  	 	// 처음 로딩됐을때, 아무것도 없을 때
	  	 	str += '<tr>';
			str += '<td>';
			str += '<select class="form-select" name="sortno"aria-label="Default select example">';
			str += '<option value="1">입금</option>';
			str += '<option value="2">출금</option>';
			str += '<option value="3" selected>차변</option>';
			str += '<option value="4">대변</option>';
			str += '</select>';
			str += '</td>';
			str += '<td><input type="text" name="accountno" class="intable"></td>';
			str += '<td><input type="text" name="accountname" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="source" class="intable"></td>';
			str += '<td><input type="text" name="summary" class="intable"></td>';
			str += '</tr>';
			str += '<tr>';
			str += '<td>';
			str += '<select class="form-select" name="sortno" aria-label="Default select example">';
			str += '<option selected>차변</option>';
			str += '<option value="1">입금</option>';
			str += '<option value="2">출금</option>';
			str += '<option value="3">차변</option>';
			str += '<option value="4" selected>대변</option>';
			str += '</select>';
			str += '</td>';
			str += '<td><input type="text" name="accountno" class="intable"></td>';
			str += '<td><input type="text" name="accountname" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="source" class="intable"></td>';
			str += '<td><input type="text" name="summary" class="intable"></td>';
			str += '</tr>';
			str += '</tbody>';
			str += '</table>';
	  	 }


		str += '<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />';
	  
	 
	  searchstart.html(str);
	}

	
	// 통장내역을 분개전표로 가져오기
	function createBankToSlipTable(detailSlip) {
	  let searchstart = $('.bottom');

	  searchstart.empty();
	  
	  	let str = '';
		str += '<table class="table detailsliptable table-bordered">';
		str += '<thead>';
		str += '<tr>';
		str += '<th scope="col" class="tabletop">구분</th>';
		str += '<th colspan="2" scope="col" class="tabletop">계정과목</th>';
		str += '<th scope="col" class="tabletop">차변</th>';
		str += '<th scope="col" class="tabletop">대변</th>';
		str += '<th scope="col" class="tabletop">거래처명</th>';
		str += '<th scope="col" class="tabletop">적요</th>';
		str += '</tr>';
		str += '</thead>';
		str += '<tbody>';
		
		
		 if(detailSlip && detailSlip.length>0){
	  		for(let i=0; i<detailSlip.length; i++){
	  			// 한 은행 통장 내역에 두 개의 분개내역을 입력하도록 두 tr로 나누기
	  			
	  			// 첫번째 tr
	  			str += '<tr>';
	  			str += '<input type="hidden" name="bhno" value="';
	  			str += detailSlip[i].bhno;
	  			str += '" />';
				str += '<td>';
				str += '<select class="form-select" name="sortno" aria-label="Default select example">';
				str += '<option value="1">입금</option>';
				str += '<option value="2">출금</option>';
				str += '<option value="3" selected>차변</option>';
				str += '<option value="4">대변</option>';
				str += '</select>';
				str += '</td>';
				str += '<td class="button-and-input"><button type="button" class="btn searchaccount btn-outline-dark" ';
				str += 'data-bs-toggle="modal" data-bs-target="#accountCode" ';
				str += 'data-btn-index="';
				str += i;   // 계정 검색 시 각 버튼에 맞게 넣을 수 있게 인덱스 추가
				str += '">';
				str += '<i class="ri-article-fill"></i>';
				str += '</button><input type="text" name="accountno" class="intable" value="';
				str += '"></td>';
				str += '<td><input type="text" name="accountname" class="intable"></td>';
				// 차변
				str += '<td><input type="text" name="amount" class="intable" value="';
				str += formatNumberWithCommas(Math.abs(detailSlip[i].amount));
				str += '"></td>';
				str += '<td class="cantwrite"><input type="text" class="intable cantwrite" readonly="readonly"></td>';
				str += '<td><input type="text" name="source" class="intable" value="';
				str += detailSlip[i].source;
				str += '"></td>';
				str += '<td><input type="text" name="summary" class="intable" value="';
				str += '"></td>';
				str += '</tr>';
				
				// 두번째 tr
	  			str += '<tr>';
	  			str += '<input type="hidden" name="bhno" value="';
	  			str += detailSlip[i].bhno;
	  			str += '" />';
				str += '<td>';
				str += '<select class="form-select" name="sortno" aria-label="Default select example">';
				str += '<option value="1">입금</option>';
				str += '<option value="2">출금</option>';
				str += '<option value="3">차변</option>';
				str += '<option value="4" selected>대변</option>';
				str += '</select>';
				str += '</td>';
				str += '<td class="button-and-input"><button type="button" class="btn searchaccount btn-outline-dark" ';
				str += 'data-bs-toggle="modal" data-bs-target="#accountCode" ';
				str += 'data-btn-index="';
				str += i+1;   // 계정 검색 시 각 버튼에 맞게 넣을 수 있게 인덱스 추가
				str += '">';
				str += '<i class="ri-article-fill"></i>';
				str += '</button><input type="text" name="accountno" class="intable" value="';
				str += '"></td>';
				str += '<td><input type="text" name="accountname" class="intable"></td>';
				// 대변
				str += '<td class="cantwrite"><input type="text" class="intable cantwrite" readonly="readonly"></td>';
				str += '<td><input type="text" name="amount" class="intable" value="';
				str += formatNumberWithCommas(Math.abs(detailSlip[i].amount));
				str += '"></td>';
				str += '<td><input type="text" name="source" class="intable" value="';
				str += detailSlip[i].source;
				str += '"></td>';
				str += '<td><input type="text" name="summary" class="intable" value="';
				str += '"></td>';
				str += '</tr>';

	  		}//end for
	  		
	  		str += '</tbody>';
			str += '</table>';
	  		str += '<button type="submit" class="btn btn-primary btnmarginright" id="insertSlipBtn">저장</button>';
	  		str += '<button type="reset" class="btn btn-outline-secondary" id="resetbtn">취소</button>';
	  	 }else{
	  	 
	  	 	// 처음 로딩됐을때, 아무것도 없을 때
	  	 	str += '<tr>';
			str += '<td>';
			str += '<select class="form-select" name="sortno"aria-label="Default select example">';
			str += '<option value="1">입금</option>';
			str += '<option value="2">출금</option>';
			str += '<option value="3" selected>차변</option>';
			str += '<option value="4">대변</option>';
			str += '</select>';
			str += '</td>';
			str += '<td><input type="text" name="accountno" class="intable"></td>';
			str += '<td><input type="text" name="accountname" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="source" class="intable"></td>';
			str += '<td><input type="text" name="summary" class="intable"></td>';
			str += '</tr>';
			str += '<tr>';
			str += '<td>';
			str += '<select class="form-select" name="sortno" aria-label="Default select example">';
			str += '<option value="1">입금</option>';
			str += '<option value="2">출금</option>';
			str += '<option value="3">차변</option>';
			str += '<option value="4" selected>대변</option>';
			str += '</select>';
			str += '</td>';
			str += '<td><input type="text" name="accountno" class="intable"></td>';
			str += '<td><input type="text" name="accountname" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="amount" class="intable"></td>';
			str += '<td><input type="text" name="source" class="intable"></td>';
			str += '<td><input type="text" name="summary" class="intable"></td>';
			str += '</tr>';
			str += '</tbody>';
			str += '</table>';
	  	 }


		str += '<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />';
	  
	 
	  searchstart.html(str);
	}// end 통장내역을 분개전표로 가져오기
	



	function formatDate(dateString) {
	  const date = new Date(dateString);
	  //const year = date.getFullYear();
	  const month = String(date.getMonth() + 1).padStart(2, '0');
	  const day = String(date.getDate()).padStart(2, '0');
	  return `${month}-${day}`;
	}
	
	
	
	function formatNumberWithCommas(number) {
  		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	// 분개 구분 선택 시 차변 대변 입력창 변경
	function handleSelectChange(selectElement) {
	    // 선택된 option의 value 값을 가져옴
	    let selectedValue = selectElement.value;
	    
	    // 부모 tr 요소를 찾음
	    let trElement = $(selectElement).closest("tr");
	    
	    // 첫번째 input, 4번째 td를 가져옴
	    let firstInput = trElement.find("input[name='amount']").eq(0);
	    let firstTd = trElement.children("td").eq(3);
	    
	    // 두번째 input 요소를 가져옴
	    let secondInput = trElement.find("input[name='amount']").eq(1);
	    let secondTd = trElement.children("td").eq(4);
	    
	    // 입금or대변 -> 첫번째 칸 비활성화, 출금or차변 -> 두번째 칸 비활성화
	    if (selectedValue == "1" || selectedValue == "4") {
	        firstInput.prop("readonly", true);
	        firstInput.addClass("cantwrite");
	        firstTd.addClass("cantwrite");
	        secondInput.prop("readonly", false);
	        secondInput.removeClass("cantwrite");
	        secondTd.removeClass("cantwrite");
	    } else if (selectedValue == "2" || selectedValue == "3") {
	        firstInput.prop("readonly", false);
	        firstInput.removeClass("cantwrite");
	        firstTd.removeClass("cantwrite");
	        secondInput.prop("readonly", true);
	        secondInput.addClass("cantwrite");
	        secondTd.addClass("cantwrite");
	    }
	}
	

	
	// 계정과목 검색
	function searchAccount() {
			$.ajax({
			    url: "/receipt/accountList",
			    type: "GET",
			    dataType: "json",
			    success: function (data) {
			      let accountList = data; // Ajax 성공 시 데이터를 accountList에 할당
			      let searchTerm = $('.valueToAccount').val().trim();
			      // 데이터를 검색어를 기준으로 필터링합니다.
			      let filteredAccounts = accountList.filter((account) => {
			        return (
			          account.accountName.includes(searchTerm) || account.accountNo.includes(searchTerm)
			        );
			      });
			      // 검색 결과를 표시
			      const accountListModal = $('#accountListModal');
			      accountListModal.empty();

			      if (filteredAccounts.length === 0) {
			        // 일치하는 결과가 없는 경우
			        accountListModal.append('<tr><td colspan="2">일치하는 계정과목이 없습니다.</td></tr>');
			      } else {
			        // 일치하는 결과가 있는 경우
			        filteredAccounts.forEach(account => {
			          const row = $('<tr>');
			          row.append('<td>' + account.accountNo + '</td><td>' + account.accountName + '</td>');
			          accountListModal.append(row);
			        });
			        $('#accountListModal tr').dblclick(function () {
	                    let selectedAccountNo = $(this).find('td:first-child').text();
	                    let selectedAccountName = $(this).find('td:nth-child(2)').text();
	             
	                    $('#searchedaccountno').val(selectedAccountNo);
	                    $('#searchedaccountname').val(selectedAccountName);

	                    // 모달 창 닫기
	                    $("#accountCode").modal("hide");
	                });
			      }
			    },
			    error: function (xhr, status, error) {
			      // 에러 처리
			      console.log("Error:", error);
			    },
			  });
		}
		
		
