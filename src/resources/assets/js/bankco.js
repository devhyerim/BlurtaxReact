

$(function(){
	
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
            
            // 수임사: 체크 불가
           historySlipRequest(search);
        });
        
        $("#left").on("click", ".ri-article-fill", function(){
			// 메모 내용, 통장내역 번호, 금액 가져와서 모달 input 에 넣기
			let bhno = $(this).closest('tr').find('input[name="bhno"]').val();
			let closestLink = $(this).closest('a');
			let memo = '';
		
			if(closestLink.length>0){
				memo = closestLink.data('bs-original-title');
			}
			
			$("#biznoInMemoModal").val(bhno);
			$("#insertedMemo").val(memo);
			
			$("#memoinsert").modal('show');
		});
		
		
		// 메모 입력 모달 창에서 저장 버튼 클릭시
		$("#saveMemoBtn").on("click", function(){
			let bhno = $("#biznoInMemoModal").val();
			let memo = $("#insertedMemo").val();
			
		    let datas = {
		            bhno: bhno,
		            memo: memo,
		   };
			
			// 통장내역번호, 메모로 해야하는 일들
			$.ajax({
		            type: "GET",
		            url: "/bank/modifyMemo",
		            dataType: "json",
		            data: datas,
		            success: function(response) {
		               alert(response);
		            },
		            error: function(xhr, status, error) {
		                console.error(error);
		            }
		     });
			
			alert("메모가 저장되었습니다.");
			
			// 모달 닫기
		    $('#memoinsert').modal('hide');
			
			// 다시 화면 로드
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
		    
		    // 수임사: 체크 불가
		   historySlipRequest(search);
			
		});
	
});// windowload function


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
                },
                error: function(xhr, status, error) {
                    console.error(error);
                }
            });
        }// end historySlipRequest
        
       
       
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
      	str += '<input type="hidden" name="bhno" value="' + data[i].bhno + '">';
 	  	str +='<td>';
 	  	str += formatDate(data[i].bhdate);
 	  	str +='</td>';
 	  	str +='<td>';
 	  	str += data[i].source;
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
	  }//end for
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
	 	  	str +='<td>';
	 	  	str +=formatDate(data[i].bhdate);
	 	  	str +='</td>';
	 	  	str +='<td>';
	 	  	str +=data[i].source;
	 	  	str +='</td>';
	 	  	if(data[i].sortno==1){
	 	  		// 입금
	 	  		str +='<td name="bhamount">';
		 	  	str +=formatNumberWithCommas(data[i].amount);
		 	  	str +='</td>';
		 	  	str +='<td></td>';
	 	  	}else{
	 	  		// 출금
	 	  		str +='<td></td>';
	 	  		str +='<td name="bhamount">';
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
	 	  	str +='<td>';
	 	  	str +=formatDate(data[i].bhdate);
	 	  	str +='</td>';
	 	  	str +='<td>';
	 	  	str +=data[i].source;
	 	  	str +='</td>';
	 	  	if(data[i].sortno==1){
	 	  		// 입금
	 	  		str +='<td name="bhamount">';
		 	  	str +=formatNumberWithCommas(data[i].amount);
		 	  	str +='</td>';
		 	  	str +='<td></td>';
	 	  	}else{
	 	  		// 출금
	 	  		str +='<td></td>';
	 	  		str +='<td name="bhamount">';
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
		  		 str +='"><i class="ri-article-fill"></i></a>';
		  		 str += '</td>';
		  	}
			str +='</tr>';
	  }
	}
	
	str += '</tbody>';
	str += '</table>';
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
	str += '<table id="" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
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
			}
	  }else{
	  }
	
	str += ' <tr>';
	str += '<td class="total"></td>';
	str += '<td class="total"><strong>합계</strong></td>';
	str += '<td class="total" colspan="3">잔액: ';
	if(total.totalsum!=null){
		str += formatNumberWithCommas(total.totalsum);
	}
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	if(total.diffsum!=null){
		str += formatNumberWithCommas(total.diffsum);
	}
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '</div>';
	
	// 확정가능 탭
	str += '<div class="tab-pane fade" id="pills-can" role="tabpanel" aria-labelledby="profile-tab">';
	str += '<table id="" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
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
	str += '<td class="total" colspan="3">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '</div>';
	
	// 확정
	str += '<div class="tab-pane fade" id="pills-certain" role="tabpanel" aria-labelledby="contact-tab">';
	str += '<table id="" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
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
	str += '<td class="total" colspan="3">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '</div>';
	
	// 제외
	str += '<div class="tab-pane fade" id="pills-except" role="tabpanel" aria-labelledby="contact-tab">';
	str += '<table id="" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
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
	str += '<td class="total" colspan="3">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '</div>';
	
	// 삭제
	str += '<div class="tab-pane fade" id="pills-remove" role="tabpanel" aria-labelledby="contact-tab">';
	str += '<table id="" class="banksliptable table table-hover table-bordered">';
	  str += '<thead><tr>';
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
	str += '<td class="total" colspan="3">잔액: ';
	str += formatNumberWithCommas(total.totalsum);
	str += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red; font-wieght: bold;">차액: '
	str += formatNumberWithCommas(total.diffsum);
	str += '</span></td>';
	str += '</tr>';
	str +='</tbody></table>';
	str += '</div>';
	str += '</div>';
	  

	searchstart.html(str);	              

	}//end of createBankSlipAllTable


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
