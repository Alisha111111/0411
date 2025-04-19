let canvas;
let stars = []; // 儲存星星的位置
let meteorCount = 6; // 流星數量

function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // 設定畫布為視窗大小
  generateStars(); // 生成星星
}

function draw() {
  background('#003049'); // 設定背景顏色為 #003049

  // 繪製星星
  fill('#FFD700'); // 設定星星顏色為黃色
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    // 如果是流星，讓它移動
    if (i < meteorCount) {
      star.x += random(2, 5); // 流星向右移動
      star.y += random(-1, 1); // 流星有輕微上下波動

      // 如果流星超出畫布，重置位置
      if (star.x > width || star.y > height || star.y < 0) {
        star.x = random(-50, 0); // 重置到畫布左側外
        star.y = random(height); // 隨機高度
      }
    }

    // 如果滑鼠靠近星星，讓星星跳開
    let d = dist(mouseX, mouseY, star.x, star.y);
    if (d < 50) { // 距離小於 50 時跳開
      star.x += random(-50, 50);
      star.y += random(-50, 50);
    }

    // 繪製五邊星星
    drawStar(star.x, star.y, star.size, star.size / 2, 5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  generateStars(); // 重新生成星星
}

function generateStars() {
  stars = []; // 清空星星陣列
  let starCount = 100; // 星星總數
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: random(width), // 隨機 x 座標
      y: random(height), // 隨機 y 座標
      size: random(5, 10) // 調整星星大小範圍為 5 到 10
    });
  }
}

/**
 * 繪製五邊星星
 * @param {number} x 星星中心的 x 座標
 * @param {number} y 星星中心的 y 座標
 * @param {number} radius1 外圈半徑
 * @param {number} radius2 內圈半徑
 * @param {number} npoints 星星的邊數
 */
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function showBusinessCard() {
  const businessCardPopup = document.getElementById("business-card-popup");
  businessCardPopup.style.display = "block"; // 顯示模態框
}

function closeBusinessCard() {
  const businessCardPopup = document.getElementById("business-card-popup");
  businessCardPopup.style.display = "none"; // 隱藏模態框
}
