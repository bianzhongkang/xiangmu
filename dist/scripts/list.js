
		class Goods{
			constructor(options){
				this.url = options.url;
				this.cont = options.cont;
				this.load();
				this.addEvent();
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					success:function(res){
						that.res = res;
						that.display()
					},
					error:function(){},
					beforeSend:function(){}
				})
			}
			display(){
				var str = ""
				this.res.forEach((value)=>{
					str += `<div class="box" data-id="${value.goodsId}">
								<img src="${value.src}">
								<span>${value.price}</span>
								<p>${value.name}</p>
								<em>添加购物车</em>
							</div>`;
				})
				this.cont.html(str);
			}
			addEvent(){
				var that = this;
				this.cont.on("click","em",function(){
					that.id = $(this).parent().attr("data-id");
					that.setCookie()
				})
			}
			setCookie(){
				
				if(!$.cookie("goods")){
					this.goods = [{
						id:this.id,
						num:1
					}]
				}else{
					this.goods = JSON.parse($.cookie("goods"))
					var isNew = false;
					for(var i=0;i<this.goods.length;i++){
						if(this.goods[i].id === this.id){
							this.goods[i].num++
							isNew = true;
							break;
						}
					}
					if(!isNew){
						this.goods.push({
							id:this.id,
							num:1
						})
					}
				}
				$.cookie("goods",JSON.stringify(this.goods))
			}
		}
		
		
		new Goods({
			url:"../goods.json",
			cont:$("#cont")
		})
		