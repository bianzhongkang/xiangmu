
 require(["../scripts/config.js"],function(){
	 require(["jquery","swiper"],function($,swiper){
		 var mySwiper = new swiper('.swiper-container', {
			autoplay: true,//可选选项，自动滑动
			 loop : true,
			 pagination: {
			el: '.swiper-pagination',
			 clickable :true,
  
			},
			navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
})
		 // 
		   function roll(){
            var top = 0;
            var notice = {};
            notice.timer = setInterval(change,50) 
            function change(){
                top--
                if(top == -40){
                    top = -8;
                }
							
                $("#main .main-t .main-t-r .main-t-r-lun").css({"top":top})
								$("#main .main-t .main-t-r .main-t-r-lun").hover(function(){
									// console.log(top)
									clearInterval(notice.timer)
								},function(){
									roll()
									
								})
            }
						
		 }
		 new roll()

		 //search定位
		
		var searchH = $("#search").offset().top;
		// console.log(searchH)
		$(window).scroll(function(){
			var scrollH = $(this).scrollTop()
		// console.log(scrollH)
			if(scrollH>=searchH){
				$("#search").css({"position":"fixed","top":0,"z-index":10})
			}else{
				$("#search").css({"position":"static"})

			}
		})
		 
// 		$("#media ul .left").click(function(){	
// 			$("#media ul").animate({
// 				left:1200
// 			},500)
// 		})
		 // 回到顶部
		$("#box").click(function(){
			
				$("html").animate({scrollTop: 0}, 500);
				})

				// 收起
				$("#pos .position .last").click(function(){
					$(".position").animate({
						right:-60
					},500,function(){
						$(".tebie").animate({
							right:0
						})
					})
				})
				$("#pos .tebie").click(function(){
					$(".tebie").animate({
						right:-60
					},500,function(){
						$(".position").animate({
							right:0
						})
					})
				})
				// 数据渲染页面
				
				$.ajax({
					url:`https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267`,
					dataType:"jsonp",
				
					success:function(res){
						let str = "";
						let myres = res.block_266[1].floorAllocations;
						console.log(myres)
						for(var i =0;i<8;i++){
							str+=`<li>
								<img src="${myres[i].img}"style='height:100px'>
								<span>${myres[i].name}</span>
								<p>${myres[i].skuprice}</p>
							</li>`
						}
						$(".main-t-c .bottom").html(str)
					}
				})
		// 下面小图片
		$.ajax({
			
			url:`https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267`,
			dataType:"jsonp",
			success:function(main){
				let str ="";
				let mymain =  main.block_266[2].floorAllocations;
				console.log(mymain)
				for(var i =0;i<8;i++){
					str+=`<li style="width:148px">
									<img src="${mymain[i].img}" style='height:80px'>
									<a style="display:block">${mymain[i].skuprice}</a>
								</li>`
				}
				$(".mytop").html(str)
			
			}
			
		})
		$.ajax({
			url:`https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267`,
			dataType:"jsonp",
			success:function(res){
				let str="";
				let ress = res.block_266[1].floorAllocations;
				console.log(res)
				for(let i =0;i<8;i++){
					str+=	`<li style="width:148px">
										<img src="${ress[i].img}" style='height:80px'>
										<a style="display:block">${ress[i].skuprice}</a>
									</li>`
				}
				$(".main-c-c .mybottom").html(str)
			}
		})
		
			$("#news .news-c .right li").hover(function(){
				// console.log(index)
				$(this).find("span").stop().animate({
					top:0
				}).end().siblings().find("span").stop().animate({
					top:-138
					
				})
				},function(){
					$(this).find("span").stop().animate({
						top:-138
					})
				})
// ---------------------------------------------------------
		
		})
	 })

// 轮播图
		 
		