/* 
			 * 思路：随机抽奖，抽一个奖项便减少一个
			 * Math 对象方法：http://www.w3school.com.cn/jsref/jsref_obj_math.asp
			 *  -random():返回 0 ~ 1 之间的随机数。
			 *  -floor():获取整数
			 * 数组操作：
			 *  - splice(x,y); x:起始位置， y:获取并删除个数
			 * Cookie.write("testKey", cookie);
			 * Cookie.read("testKey");
			 */

			function random(min, max) {
				if (Math.floor(min + Math.random() * 100) <= 20) return 0;
				if (Math.floor(min + Math.random() * 100) > 20 && Math.floor(min + Math.random() * 100) <= 60) return 1;
				if (Math.floor(min + Math.random() * 100) > 60 && Math.floor(min + Math.random() * 100) <= 90) return 2;
				return 3;
			}
			var awardListDom = document.getElementById("awardListDom"),
				num = document.getElementById("num"),
				submit = document.getElementById("submit");
			var awardList = ["优惠券1", "没中奖，再试一次", "优惠券3", "优惠券4"];
			//把抽取记录存进缓存
			// cookie的读写
			function setCookie(name, value) {
				var Days = 7;
				var exp = new Date();
				exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000 );
				document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
			}
			
			function getCookie(name) {
				var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if (arr = document.cookie.match(reg))
					return unescape(arr[2]);
				else
					return null;
			}
			// cookie的读写

			awardListDom.value = awardList;
			submit1.onclick = function() {
				// document.cookie = "ifdo1=" + true
				// setCookie("ifdo", true)
				// setCookie("ifdo", false)
				var ifdo = getCookie("ifdo")
				// alert(ifdo)
				if (ifdo == "true") {
					// localStorage.setItem("ifdo", false);
					// Cookie.write("ifdo", true);
					alert("已经抽过了。")
				} else {
					// 引用数组
					var oldArray = awardList;
					var rNum = random(0, oldArray.length);
					if (submit.value == "点击领取") {
						if (num.value == "没中奖，再试一次")
							window.location.href = "index.html"
						if (num.value == "优惠券1") {
							window.location.href =
								"https://v03.jz0351.com/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=sale.coupon.quickget&id=5"
							// localStorage.setItem("ifdo", true); //用localStorage保存转化好的的字符串
							setCookie("ifdo", true)
						}
						if (num.value == "优惠券3") {
							window.location.href =
								"https://v03.jz0351.com/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=sale.coupon.quickget&id=4"
							// localStorage.setItem("ifdo", true); //用localStorage保存转化好的的字符串
							setCookie("ifdo", true)
						}
						if (num.value == "优惠券4") {
							window.location.href =
								"https://v03.jz0351.com/app/index.php?i=2&c=entry&m=ewei_shopv2&do=mobile&r=sale.coupon.quickget&id=5"
							// localStorage.setItem("ifdo", true); //用localStorage保存转化好的的字符串
							setCookie("ifdo", true)
						}
					} else if (oldArray.length < 4) {
						awardListDom.value = "您已经抽过";
						num.value = "您已经抽过了，点击下方领取按钮即可跳转领取页面。";
					} else if (oldArray.length == 4) {
						// num.value = "点击领取"
						num.value = oldArray[rNum];
						oldArray.splice(rNum, 1);
						submit.value = "点击领取";
					}
				}
			}