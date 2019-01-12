class Car{
			constructor(options){
				this.url = options.url;
				this.tbody = options.tbody;
				this.load()
				this.addEvent()
			}
			load(){
				$.ajax({
					url:this.url,
					success:(res)=>{
						this.res = res;
						this.getCookie();
					}
				})
			}
			getCookie(){
				this.goods = JSON.parse($.cookie("goods"));
				this.display()
			}
			display(){
				var str = "";
				this.res.forEach((resValue)=>{
					this.goods.forEach((goodsValue)=>{
						if(resValue.goodsId == goodsValue.id){
							str += `<tr data-id="${resValue.goodsId}">
										<td><img src="${resValue.src}"/></td>
										<td>${resValue.name}</td>
										<td class="dan">${resValue.price}</td>
										<td><input min="1" type="number" value="${goodsValue.num}" class="shu"></td>
										<td class="mymoney a">${resValue.price * goodsValue.num}</td>
										<td><span>删除</span></td>
									</tr>`
						}
					})
				})
				this.tbody.html(str);
				this.mymuch();
				
			}
			addEvent(){
				var that = this;
				this.tbody.on("click","span",function(){
					that.id = $(this).parent().parent().attr("data-id");
					$(this).parentsUntil("tbody").remove()
					that.remove()
				})
				
				this.tbody.on("input","input",function(){
					that.num = $(this).val()
					that.id = $(this).parent().parent().attr("data-id");
					that.changeCookie()
				})
					

			}
			remove(){
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id == this.id){
						break;
					}
				}
				this.goods.splice(i,1);
				$.cookie("goods",JSON.stringify(this.goods))
			}
			changeCookie(){
				for(var i=0;i<this.goods.length;i++){
					if(this.goods[i].id == this.id){
						this.goods[i].num = this.num;
					}
				}
				$.cookie("goods",JSON.stringify(this.goods))
			}
			
			mymuch(){
				$(".foor").click(()=>{
					this.mymoney = Array.from($("td.mymoney"))
					console.log(this.mymoney)
					this.num=0;
					this.a = $("td.a")
					for(var i =0;i<this.mymoney.length;i++){
						
						this.num+=parseInt(this.mymoney[i].innerText);
					}
					$(".foot").find("span").html(this.num)
					
				})
			}
				
		}
		
		
		new Car({
			url:"../goods.json",
			tbody:$("tbody"),
			foor:$(".foor"),
			jia:$("#jia")
		})
				
			
			
		