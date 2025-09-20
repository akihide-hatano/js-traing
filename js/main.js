  // ── 状態（唯一の真実）: ここに全データを持つ
  const nums = []; // 入力された数値を配列で保持

  // ── 要素取得（これより上で numInput を使わないことが重要）
  const numInput = document.getElementById('num');   // 数値入力欄
  const addBtn   = document.getElementById('addBtn'); // 追加ボタン
  const listEl   = document.getElementById('list');   // 配列表示エリア
  const sumEl    = document.getElementById('sum');    // 合計表示エリア

  // ── 画面起動時、入力欄にフォーカス（カーソルを置く）
  window.addEventListener('load', () => numInput.focus()); // 次の入力にすぐ移れるUX

  // ── 描画カウンタ（何回renderしたか追う用）
  let renderCount = 0; // デバッグ用の連番

  // ── 画面を“毎回つくり直す”関数（状態→UI）
  function render() {
    console.log(`[render] #${++renderCount}`, { nums: [...nums] }); // 今回の描画番号と配列の中身をログ

    listEl.textContent = JSON.stringify(nums); // 配列をそのまま文字列にして表示（学習用に見やすく）

    let s = 0; // 合計の初期値
    for (const n of nums) { // 配列を先頭から順に取り出す
      s += n; // 1つずつ足し込む
      console.log('[sum step]', { n, s }); // 足し込み過程を観察（学習用。不要なら削除OK）
    }

    sumEl.textContent = s; // 計算が終わってから1回だけDOM更新（効率が良い）
    console.log('[stats]', { total: s, count: nums.length }); // 合計と件数を最終ログ
  }

  // ── 追加（入力→検証→状態変更→描画）
  function add() {
    const raw = numInput.value.trim(); // 入力値の前後の空白だけ削除（空入力を正しく判定するため）
    console.log('[add] raw =', raw);   // 生の入力を確認（デバッグしやすく）

    if (raw === '' || isNaN(Number(raw))) { // 空、または数値に変換できないなら
      console.warn('数値ではありません:', raw); // 警告ログ
      numInput.focus(); // 入力欄にフォーカスを戻してすぐ修正できるように
      return; // 状態を変えない＝renderもしない（安全）
    }

    nums.push(Number(raw)); // ここで初めて状態を変更（数値にして配列末尾に追加）
    numInput.value = '';    // 成功したので入力欄をクリア（連続入力がしやすい）
    render();               // 状態が変わったのでUIを更新
    numInput.focus();       // 連続入力のためにフォーカス維持
  }

  // ── ボタンとEnterキーで add() を呼ぶ（イベント→状態変更の入り口）
  addBtn.addEventListener('click', add); // クリックで追加
  numInput.addEventListener('keydown', (e) => { // 入力中に
    if (e.key === 'Enter') add(); // Enterでも追加できると便利
  });

  // ── 最初の一回だけ描画（空の配列でもUIを整える）
  render(); // ページ表示時に「配列: []」「合計: 0」を出しておく