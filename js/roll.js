AFRAME.RegisterComponent("B_Ball",{
    init: function(){
        this.rollBall()
    },
    rollBall: function(){
        window.addEventListener("keydown",(e)=>{
            if (e.key==="c"){
                var ball = document.createElement("a-entity");
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:1,
                })
                ball.setAttribute("material","color","black");

                var cam = document.querySelector("#camera");

                pos = cam.getAttribute("position");
                
                ball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z
                })

                var camera = document.querySelector("#camera").object3D;

                var direction = new THREE.Vector3();

                camera.getWorldDirection(direction);

                ball.setAttribute("velocity", direction.multiScaler(-10))

                var scene = document.querySelector("#scene");

                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0",
                })
                bullet.addEventListener("collide",this.removeBall)
                scene.appendChild(ball);

            }
        })



        
        
    },
    removeBall: function (e){
        var element = e.detail.target.el;

        var elementHit = e.detail.body.el;

        if(elementHit.id.includes("pin")){
            var impulse = new CANNON.Vec3(0,1,-15);
            var worldPoint = new CANNON.Vec().copy(
                elementHit.getAttribute("position")

            );
            element.Hit.body.applyForce(impulse,worldPoint);

            element.removeEventlistener("collide", this.removeBall);

            var scene = dpcument.querySelector("#scene");
            scene.removeChild(element);
        }
    }
})