const git=Vue.component('git',{
    template:`<div style="padding-top: 80px;width: 100%;height: 100%">测试测试测试测试</div>`
})
const Head = Vue.component('Head', {
    template: `
    <div class="body">
    <div class="nve">
    <div class="left"><router-view name="left"></router-view></div>
    
    <div class="right"><router-view name="right"></router-view></div>
    </div>
    
</div>
    `
})
const Left = Vue.component('left', {
    template: `
            <div>
            <ul>
            <div v-for="item in datas">
            <li><router-link :to="'#'+item.id">{{item.title}}</router-link></li>
                <ul v-for="item1 in item.child">
                <li><router-link :to="'#'+item1.id">{{item1.title}}</router-link></li>
</ul>
            </div>
</ul>
</div>
    `,
    data() {
        return {
            mou:[]
        }

    },
    computed:{
        datas() {
            var arr = [];
            for (var i in this.mou) {
                if (this.mou[i].pid == 0) {
                    arr.push(this.mou[i]);
                } else {
                    for (var j in arr) {
                        console.log(j)
                        if (arr[j].id == this.mou[i].pid) {
                            if (arr[j].child) {
                                arr[j].child.push(this.mou[i])
                            } else {
                                arr[j].child = [];
                                arr[j].child.push(this.mou[i])
                            }
                        }
                    }
                }
            }
            return arr;


        }
    },
    mounted(){
        fetch('./data.txt').then(function (e) {
            return e.json();
        }).then((e)=>{
            this.mou=e;
        })
    }
})
const Right = Vue.component('right', {
    template: `
   <div >
   <div class="markdown-body" v-html="datas"></div>
   
</div>
    `,
    data(){
        return {
            datas:""
        }
    },
    mounted(){
        fetch('./md.txt').then(function (e) {
            return e.text();
        }).then((e)=>{
            this.datas=e;
        })
    },
    watch:{
        $route(){
            var num=(this.$route.hash.slice(1))
            var pos=(document.querySelector(".a"+num).offsetTop-80);
            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({number:document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number:pos},500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop=this.number.toFixed(0);
                })
                .start();
            animate()

        }
    }
})