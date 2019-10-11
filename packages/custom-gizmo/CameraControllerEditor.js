class CameraControllerEditor extends Editor.Gizmo {

    init() {
        // 初始化一些参数
    }

    onCreateRoot() {
        // 创建 svg 根节点的回调，可以在这里创建你的 svg 工具
        // this._root 可以获取到 Editor.Gizmo 创建的 svg 根节点

        // 实例：

        // 创建一个 svg 工具
        // group 函数文档 : http://documentup.com/wout/svg.js#groups
        this._tool = this._root.group();

        // 画一个的圆
        // circle 函数文档 : http://documentup.com/wout/svg.js#circle
        let circle = this._tool.circle();

        // 为 tool 定义一个绘画函数，可以为其他名字
        this._tool.plot = (width, height, position) => {
            this._tool.move(position.x, position.y);
            // this._tool.rect(width, height)
            circle.radius(width);
        };
    }

    onUpdate() {
        // 在这个函数内更新 svg 工具

        // 获取 gizmo 依附的组件
        let target = this.target;

        // 获取 gizmo 依附的节点
        let node = this.node;

        // 获取组件半径
        let radius = 100;

        // 获取节点世界坐标
        let worldPosition = node.convertToWorldSpaceAR(cc.v2(0, 0));

        // 转换世界坐标到 svg view 上
        // svg view 的坐标体系和节点坐标体系不太一样，这里使用内置函数来转换坐标
        let viewPosition = this.worldToPixel(worldPosition);

        // 对齐坐标，防止 svg 因为精度问题产生抖动
        let p = Editor.GizmosUtils.snapPixelWihVec2(viewPosition);


        let width = this.convert(node, node.width, worldPosition);
        let height = this.convert(node, node.height, worldPosition);

        // 获取世界坐标下圆半径

        // 移动 svg 工具到坐标
        this._tool.plot(width, height, p);
    }

    convert(node, num, worldPos) {
        let worldPosition2 = node.convertToWorldSpaceAR(cc.v2(num, 0));
        let worldSize = worldPos.sub(worldPosition2).mag();
        worldSize = Editor.GizmosUtils.snapPixel(worldSize);
        return worldSize;
    }

    visible() {
        return this.selecting || this.editing;
    }
}

module.exports = CameraControllerEditor;