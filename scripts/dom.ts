const $board: SVGElement | null = document.querySelector(".board");
let selectedElement: boolean = false;
let res: Rect | null;
let startX: number, startY: number;
function startDrag(e: MouseEvent) {
  const { pageX: x, pageY: y } = e;

  startX = x;
  startY = y;
  selectedElement = true;
  res = new Rect({ x, y, width: 0, height: 0 });

  $board?.append(res.shape);
}

function drag(e: MouseEvent) {
  if (!!selectedElement) {
    // TODO: 디테일하게 180도 뿐만아니라 x가 작은지 y가 작은지에 따라서 처리해주기
    const { pageX: x, pageY: y } = e;
    let x1 = x - startX;
    let y1 = startY - y;

    if (x1 < 0 && y1 > 0) {
      console.log("10시방향");
      res?.shape.setAttributeNS(null, "x", `${x}`);
      res?.shape.setAttributeNS(null, "y", `${y}`);
    } else if (x1 < 0 && y1 < 0) {
      console.log("7시 방향");
      res?.shape.setAttributeNS(null, "x", `${x}`);
    } else if (x1 > 0 && y1 > 0) {
      console.log("2시");
      res?.shape.setAttributeNS(null, "y", `${y}`);
    }

    x1 = Math.abs(x1);
    y1 = Math.abs(y1);
    res?.updateWidth({ width: x1, height: y1 });
  }
}
function endDrag(e: MouseEvent) {
  selectedElement = false;
}

$board?.addEventListener("mousedown", startDrag);
$board?.addEventListener("mousemove", drag);
$board?.addEventListener("mouseup", endDrag);
$board?.addEventListener("mouseleave", endDrag);
