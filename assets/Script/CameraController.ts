// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {

    @property(cc.Node)
    followTarget: cc.Node = null;


    // onLoad () {}

    start () {

    }

    //update (dt) {}

    update(dt){
        let worldPos = this.followTarget.parent.convertToWorldSpaceAR(new cc.Vec2(this.followTarget.position.x,this.followTarget.position.y + 100));
        this.node.position = worldPos; 
    }
}
