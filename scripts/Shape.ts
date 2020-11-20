interface IRect {
  x: number;
  y: number;
  rx: number;
  ry: number;
  width: number;
  height: number;
  strokeWidth: number;
}

class Common {
  svgns: string;
  constructor(protected fillColor: string = "skyblue", protected strokeColor: string = "black") {
    this.svgns = "http://www.w3.org/2000/svg";
  }

  changeFill(fillColor: string = this.fillColor): void {
    this.fillColor = fillColor;
  }

  changeStrokeColor(strokeColor: string = this.strokeColor): void {
    this.strokeColor = strokeColor;
  }
}

abstract class Shape extends Common {
  shape: SVGElement;
  constructor(protected shapeStr: string) {
    super();

    this.shape = document.createElementNS(this.svgns, this.shapeStr) as SVGElement;
  }

  abstract make(): void;
}

class Rect extends Shape implements IRect {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
  strokeWidth: number;
  constructor({ x = 10, y = 20, width = 0, height = 0, rx = 0, ry = 0, strokeWidth = 0 }: Partial<Rect>) {
    console.log({ x, y });
    super("rect");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rx = rx;
    this.ry = ry;
    this.strokeWidth = strokeWidth;
    this.make();
  }

  make() {
    this.shape.setAttributeNS(null, "x", this.x.toString());
    this.shape.setAttributeNS(null, "y", this.y.toString());
    this.shape.setAttributeNS(null, "rx", this.rx.toString());
    this.shape.setAttributeNS(null, "ry", this.ry.toString());
    this.shape.setAttributeNS(null, "width", this.width.toString());
    this.shape.setAttributeNS(null, "height", this.height.toString());
    this.shape.setAttributeNS(null, "fill", this.fillColor);
    this.shape.setAttributeNS(null, "stroke", this.strokeColor);
    this.shape.setAttributeNS(null, "stroke-width", this.strokeWidth.toString());
  }

  updateWidth({ width = 0, height = 0 }: Partial<IRect>): void {
    this.shape.setAttributeNS(null, "width", width.toString());
    this.shape.setAttributeNS(null, "height", height.toString());
  }
}
