const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    ball_node : cc.Node = null;

    _graphics : cc.Graphics = null;

    _touchStartPos : cc.Vec2;

    _ballRb : cc.RigidBody;

    onLoad(){
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        this._graphics = this.getComponent(cc.Graphics);

        this._graphics.lineWidth = 3;
        this._graphics.strokeColor = cc.Color.GREEN;

        this._ballRb = this.ball_node.getComponent(cc.RigidBody);
    }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd.bind(this));
    }

    onTouchStart(event){
        this._touchStartPos = event.getLocation();
        cc.log("touch start " + this._touchStartPos);
        this._graphics.clear();
        this._graphics.moveTo(this.ball_node.x,this.ball_node.y);
        let localPos = this.node.convertToNodeSpaceAR(this._touchStartPos);
        this._graphics.lineTo(localPos.x,localPos.y);
        this._graphics.stroke();
    }

    onTouchMove(event){
        let pos : cc.Vec2 = event.getLocation();
        cc.log("touch move " + pos);
        let localPos = this.node.convertToNodeSpaceAR(pos);
        this._graphics.clear();
        this._graphics.moveTo(this.ball_node.x,this.ball_node.y);
        this._graphics.lineTo(localPos.x,localPos.y);
        this._graphics.stroke();
    }

    onTouchEnd(event){
        let pos : cc.Vec2 = event.getLocation();
        cc.log("touch end " + pos);
        this._graphics.clear();
        let localPos = this.node.convertToNodeSpaceAR(pos);
        let dir : cc.Vec2 = localPos.sub(this.ball_node.position).normalize(); 
        cc.log(dir);
        this._ballRb.linearVelocity = dir.mul(500);
    }

}
