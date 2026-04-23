import './style.css'

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Algorithm {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  speedScore: number; // 0 to 100, for visual progress bar
  merits: string[];
  demerits: string[];
  code: string;
}

const bubbleSortCode = `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}`;

const selectionSortCode = `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
}`;

const insertionSortCode = `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`;

const mergeSortCode = `function mergeSort(arr, l, r) {
  if (l >= r) return;
  const m = l + Math.floor((r - l) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}

function merge(arr, l, m, r) {
  const L = arr.slice(l, m + 1);
  const R = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;
  while (i < L.length && j < R.length) {
    if (L[i] <= R[j]) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }
  while (i < L.length) arr[k++] = L[i++];
  while (j < R.length) arr[k++] = R[j++];
}`;

const quickSortCode = `function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;

const heapSortCode = `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`;

const algorithms: Algorithm[] = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    description: '隣り合う要素を比較し、順序が逆であれば入れ替える操作を繰り返すシンプルなアルゴリズム。',
    difficulty: 'Easy',
    timeComplexity: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    speedScore: 20,
    merits: ['実装が非常に簡単', '安定ソートである', '省メモリ（追加の記憶領域をほとんど必要としない）'],
    demerits: ['データ量が増えると非常に遅い', '実用的な場面ではほとんど使われない'],
    code: bubbleSortCode
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    description: '未ソート部分から最小（または最大）の要素を見つけ、先頭の要素と交換していくアルゴリズム。',
    difficulty: 'Easy',
    timeComplexity: { best: 'O(N²)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    speedScore: 25,
    merits: ['実装が簡単', 'スワップ（交換）の回数が最大でもN回で済む', '省メモリ'],
    demerits: ['常にO(N²)の時間がかかるため遅い', '不安定ソートである'],
    code: selectionSortCode
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    description: '未ソートの要素を、ソート済み部分の適切な位置に挿入していくアルゴリズム。',
    difficulty: 'Easy',
    timeComplexity: { best: 'O(N)', average: 'O(N²)', worst: 'O(N²)' },
    spaceComplexity: 'O(1)',
    speedScore: 40,
    merits: ['実装が比較的簡単', '整列済みのデータに対しては非常に高速(O(N))', '安定ソートである', 'データ数が少ない場合に有効'],
    demerits: ['データ量が多いと遅い', '逆順のデータに対しては最も遅い'],
    code: insertionSortCode
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    description: '配列を分割し、それらをソートしながらマージ（併合）していく分割統治法に基づくアルゴリズム。',
    difficulty: 'Medium',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
    spaceComplexity: 'O(N)',
    speedScore: 80,
    merits: ['常にO(N log N)で安定して高速', '安定ソートである', 'ランダムアクセスが遅い連結リストのソートに向いている'],
    demerits: ['実装が少し複雑', 'データ量と同じサイズの追加メモリ領域が必要(O(N))'],
    code: mergeSortCode
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    description: 'ピボットを選び、それより小さい要素と大きい要素に分割することを繰り返すアルゴリズム。',
    difficulty: 'Medium',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N²)' },
    spaceComplexity: 'O(log N)',
    speedScore: 95,
    merits: ['平均的に最も高速なソートの一つ', '追加メモリが少なくて済む', '多くの標準ライブラリで採用されている'],
    demerits: ['最悪計算量がO(N²)になる可能性がある（ピボットの選び方に依存）', '不安定ソートである'],
    code: quickSortCode
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    description: 'データをヒープ構造（親が子より常に大きい/小さい木構造）に構成してソートするアルゴリズム。',
    difficulty: 'Hard',
    timeComplexity: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)' },
    spaceComplexity: 'O(1)',
    speedScore: 85,
    merits: ['常にO(N log N)で高速', '追加メモリをほとんど必要としない(O(1))', '最悪ケースでも安定した速度'],
    demerits: ['実装が複雑', '不安定ソートである', '定数項が大きいため、平均的にはクイックソートより遅い場合が多い'],
    code: heapSortCode
  }
];

function getBadgeClass(diff: Difficulty) {
  switch (diff) {
    case 'Easy': return 'badge-easy';
    case 'Medium': return 'badge-medium';
    case 'Hard': return 'badge-hard';
  }
}

function getSpeedClass(score: number) {
  if (score >= 80) return 'speed-fast';
  if (score >= 50) return 'speed-avg';
  return 'speed-slow';
}

function renderCards() {
  const container = document.getElementById('grid-container');
  if (!container) return;

  container.innerHTML = algorithms.map(algo => `
    <div class="card" data-id="${algo.id}">
      <div class="card-header">
        <h2 class="card-title">${algo.name}</h2>
        <span class="card-badge ${getBadgeClass(algo.difficulty)}">${algo.difficulty}</span>
      </div>
      
      <div class="card-content">
        <div class="metric">
          <div class="metric-label">
            <span>Avg Time Complexity</span>
            <span class="metric-value">${algo.timeComplexity.average}</span>
          </div>
        </div>
        
        <div class="metric">
          <div class="metric-label">
            <span>Relative Speed</span>
            <span>${algo.speedScore}/100</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${getSpeedClass(algo.speedScore)}" style="width: 0%" data-width="${algo.speedScore}%"></div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Animate progress bars after slight delay
  setTimeout(() => {
    const fills = document.querySelectorAll('.progress-fill') as NodeListOf<HTMLElement>;
    fills.forEach(fill => {
      fill.style.width = fill.getAttribute('data-width') || '0%';
    });
  }, 100);

  // Add click listeners
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const algo = algorithms.find(a => a.id === id);
      if (algo) openModal(algo);
    });
  });
}

function openModal(algo: Algorithm) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  content.innerHTML = `
    <h2 class="modal-title">${algo.name}</h2>
    <p class="modal-desc">${algo.description}</p>
    
    <div class="modal-grid">
      <div class="complexities modal-section">
        <h3>⚡ Complexities</h3>
        <div class="comp-item">
          <span class="comp-label">Best Time</span>
          <span class="comp-val">${algo.timeComplexity.best}</span>
        </div>
        <div class="comp-item">
          <span class="comp-label">Average Time</span>
          <span class="comp-val">${algo.timeComplexity.average}</span>
        </div>
        <div class="comp-item">
          <span class="comp-label">Worst Time</span>
          <span class="comp-val">${algo.timeComplexity.worst}</span>
        </div>
        <div class="comp-item">
          <span class="comp-label">Space Complexity</span>
          <span class="comp-val">${algo.spaceComplexity}</span>
        </div>
      </div>

      <div class="modal-section">
        <h3>✨ Merits</h3>
        <ul>
          ${algo.merits.map(m => `<li>${m}</li>`).join('')}
        </ul>
        <h3 style="margin-top: 1.5rem; color: var(--danger);">⚠️ Demerits</h3>
        <ul>
          ${algo.demerits.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Optional Demo Section -->
    <div class="demo-box">
      <h3>Algorithm Demo (Visualization)</h3>
      
      <div class="demo-controls">
        <div class="speed-control">
          <label for="speed-slider">Speed:</label>
          <input type="range" id="speed-slider" min="1" max="5" value="3" class="speed-slider">
          <span id="speed-label" class="speed-label">x1.0</span>
        </div>
        <button id="btn-demo" class="btn-demo">▶ Start ${algo.name}</button>
      </div>

      <div id="demo-status" class="demo-status">
        <strong id="action-title" class="action-title">Ready to start!</strong>
        <p id="action-desc" class="action-desc">Startボタンを押すとアニメーションと解説が始まります。</p>
      </div>
      
      <div class="demo-dual-pane">
        <div class="visualizer-pane">
          <div id="array-container" class="array-container">
            <!-- Bars will be generated here -->
          </div>
        </div>
        <div class="code-pane">
          <div class="code-header">Source Code (TypeScript/JS)</div>
          <div id="code-container" class="code-container">
            <!-- Code will be injected here -->
          </div>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  
  // Setup demo
  setupDemo(algo);
}

// Simple demo visualization logic
function setupDemo(algo: Algorithm) {
  const container = document.getElementById('array-container');
  const btn = document.getElementById('btn-demo') as HTMLButtonElement;
  const titleEl = document.getElementById('action-title');
  const descEl = document.getElementById('action-desc');
  const speedSlider = document.getElementById('speed-slider') as HTMLInputElement;
  const speedLabel = document.getElementById('speed-label');

  if (!container || !btn || !titleEl || !descEl || !speedSlider || !speedLabel) return;

  const speedMap: Record<number, { delay: number, label: string }> = {
    1: { delay: 1500, label: "x0.25" },
    2: { delay: 1000, label: "x0.5" },
    3: { delay: 600,  label: "x1.0" },
    4: { delay: 200,  label: "x2.0" },
    5: { delay: 50,   label: "x4.0" }
  };

  speedSlider.addEventListener('input', (e) => {
    const val = parseInt((e.target as HTMLInputElement).value);
    speedLabel.textContent = speedMap[val].label;
  });

  // initial label set
  speedLabel.textContent = speedMap[parseInt(speedSlider.value)].label;

  // Generate random array
  const arraySize = 15;
  let arr = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100) + 10);
  
  function renderArray(activeIndices: number[] = [], sortedIndices: number[] = [], message = { title: "Ready to start!", desc: "Startボタンを押すとアニメーションと解説が始まります。" }) {
    if (titleEl) titleEl.textContent = message.title;
    if (descEl) descEl.textContent = message.desc;
    if (!container) return;
    container.innerHTML = arr.map((val, idx) => {
      let color = 'var(--primary)'; // default blue
      if (activeIndices.includes(idx)) color = 'var(--warning)'; // yellow/orange comparing
      if (sortedIndices.includes(idx)) color = 'var(--secondary)'; // green sorted
      return `<div class="array-bar" style="height: ${val}%; background: ${color};"><span class="bar-value">${val}</span></div>`;
    }).join('');
  }

  function renderCode(activeLine?: number, variables?: Record<string, any>) {
    const codeContainer = document.getElementById('code-container');
    if (!codeContainer) return;
    const lines = algo.code.split('\n');
    codeContainer.innerHTML = lines.map((line, idx) => {
      const lineNum = idx + 1;
      const isActive = lineNum === activeLine;
      const safeLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      let varsHtml = '';
      if (isActive && variables) {
        const varsStr = Object.entries(variables).map(([k, v]) => `${k}=${v}`).join(', ');
        varsHtml = `<span class="code-vars"> // ${varsStr}</span>`;
      }

      return `<div class="code-line ${isActive ? 'active-line' : ''}"><span class="line-number">${lineNum}</span><span class="line-content">${safeLine}${varsHtml}</span></div>`;
    }).join('');

    if (activeLine) {
      const activeEl = codeContainer.querySelector('.active-line');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  renderArray();
  renderCode();

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Sorting...';
    speedSlider.disabled = true;
    
    // Dispatch to correct sort generator based on algorithm id
    // We use generators or async functions with delay to animate
    let sortGenerator: AsyncGenerator<any, void, unknown>;
    
    switch(algo.id) {
      case 'bubble': sortGenerator = bubbleSort(arr); break;
      case 'selection': sortGenerator = selectionSort(arr); break;
      case 'insertion': sortGenerator = insertionSort(arr); break;
      case 'merge': sortGenerator = mergeSortWrapper(arr); break;
      case 'quick': sortGenerator = quickSortWrapper(arr); break;
      case 'heap': sortGenerator = heapSort(arr); break;
      default: sortGenerator = bubbleSort(arr);
    }

    for await (const state of sortGenerator) {
      // state: { arr: number[], active: number[], sorted: number[], message?: {title, desc}, activeLine?: number, variables?: Record<string, any> }
      arr = [...state.arr];
      renderArray(state.active, state.sorted, state.message);
      if (state.activeLine) renderCode(state.activeLine, state.variables);
      const currentDelay = speedMap[parseInt(speedSlider.value)].delay;
      await new Promise(r => setTimeout(r, currentDelay));
    }

    renderArray([], Array.from({length: arraySize}, (_, i) => i), { title: "Sorting Complete!", desc: "ソートが完了しました。" }); // All sorted
    renderCode(); // clear active line
    btn.textContent = 'Done!';
    speedSlider.disabled = false;
  });
}

// === SORTING GENERATORS FOR ANIMATION ===

async function* bubbleSort(array: number[]) {
  const a = [...array];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { arr: a, active: [j, j+1], sorted: [], activeLine: 5, variables: { 'arr[j]': a[j], 'arr[j + 1]': a[j+1] }, message: { title: `比較: ${a[j]} と ${a[j+1]}`, desc: `隣り合う要素を比較します。左(${a[j]})が右(${a[j+1]})より大きい場合、交換を行います。` } };
      if (a[j] > a[j + 1]) {
        yield { arr: a, active: [j, j+1], sorted: [], activeLine: 6, variables: { 'arr[j]': a[j], 'arr[j + 1]': a[j+1] }, message: { title: `交換条件に一致`, desc: `${a[j]} は ${a[j+1]} より大きいため、順序を正しくするためにスワップ（交換）します。` } };
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { arr: a, active: [j, j+1], sorted: [], activeLine: 6, variables: { 'arr[j]': a[j], 'arr[j + 1]': a[j+1] }, message: { title: `交換完了`, desc: `要素の入れ替えが完了しました。大きい値が右へ移動しました。` } };
      }
    }
  }
}

async function* selectionSort(array: number[]) {
  const a = [...array];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      yield { arr: a, active: [minIdx, j], sorted: [], activeLine: 6, variables: { 'arr[j]': a[j], 'arr[minIdx]': a[minIdx] }, message: { title: `最小値の探索: 暫定最小値 ${a[minIdx]}`, desc: `現在の未ソート部分の最小値候補(${a[minIdx]})と、探索中の要素(${a[j]})を比較しています。` } };
      if (a[j] < a[minIdx]) {
        minIdx = j;
        yield { arr: a, active: [minIdx], sorted: [], activeLine: 7, variables: { 'minIdx': j }, message: { title: `新しい最小値を発見`, desc: `より小さい値(${a[minIdx]})が見つかりました。これを新しい最小値の候補とします。` } };
      }
    }
    if (minIdx !== i) {
      yield { arr: a, active: [i, minIdx], sorted: [], activeLine: 11, variables: { 'arr[i]': a[i], 'arr[minIdx]': a[minIdx] }, message: { title: `最小値の配置`, desc: `未ソート部分全体を調べ終わりました。見つけた最小値(${a[minIdx]})を、未ソート部分の先頭(${a[i]})と交換します。` } };
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      yield { arr: a, active: [i, minIdx], sorted: [], activeLine: 11, variables: { 'arr[i]': a[i], 'arr[minIdx]': a[minIdx] }, message: { title: `交換完了`, desc: `最小値が適切な位置に配置され、ソート済み部分が1つ増えました。` } };
    }
  }
}

async function* insertionSort(array: number[]) {
  const a = [...array];
  const n = a.length;
  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;
    yield { arr: a, active: [i], sorted: [], activeLine: 6, variables: { 'key': key, 'arr[j]': j >= 0 ? a[j] : 'undefined' }, message: { title: `挿入要素の選択: ${key}`, desc: `次にソート済み部分へ挿入する要素(${key})を選択しました。適切な位置を見つけるまで左へ比較していきます。` } };
    while (j >= 0 && a[j] > key) {
      yield { arr: a, active: [j, j+1], sorted: [], activeLine: 7, variables: { 'arr[j]': a[j] }, message: { title: `要素のシフト: ${a[j]}`, desc: `比較対象の要素(${a[j]})は挿入要素(${key})より大きいため、右に一つずらして挿入用のスペースを空けます。` } };
      a[j + 1] = a[j];
      j = j - 1;
    }
    a[j + 1] = key;
    yield { arr: a, active: [j+1], sorted: [], activeLine: 10, variables: { 'key': key }, message: { title: `要素の挿入`, desc: `適切な位置が見つかったため、要素(${key})を挿入しました。` } };
  }
}

// Merge sort is tricky to visualize in-place with generators, so this is a simplified version
async function* mergeSortWrapper(array: number[]) {
  const a = [...array];
  
  async function* mergeSort(arr: number[], l: number, r: number): AsyncGenerator<any, void, unknown> {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    yield { arr, active: [l, r], sorted: [], activeLine: 3, variables: { 'l': l, 'r': r }, message: { title: `配列の分割`, desc: `インデックス ${l} から ${r} の範囲の配列を半分に分割します。` } };
    yield* mergeSort(arr, l, m);
    yield* mergeSort(arr, m + 1, r);
    yield* merge(arr, l, m, r);
  }
  
  async function* merge(arr: number[], l: number, m: number, r: number) {
    yield { arr, active: [l, r], sorted: [], activeLine: 10, variables: { 'l': l, 'm': m, 'r': r }, message: { title: `配列の統合 (Merge)`, desc: `分割された2つのソート済み部分配列を、1つの配列へと順番に併合（マージ）します。` } };
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      yield { arr, active: [k], sorted: [], activeLine: 14, variables: { 'L[i]': L[i], 'R[j]': R[j] }, message: { title: `値の比較と配置`, desc: `左側の要素(${L[i]})と右側の要素(${R[j]})を比較します。` } };
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        yield { arr, active: [k], sorted: [], activeLine: 15, variables: { 'L[i]': L[i] }, message: { title: `左側の値を配置`, desc: `${L[i]} が選ばれて元の配列に配置されました。` } };
        i++;
      } else {
        arr[k] = R[j];
        yield { arr, active: [k], sorted: [], activeLine: 17, variables: { 'R[j]': R[j] }, message: { title: `右側の値を配置`, desc: `${R[j]} が選ばれて元の配列に配置されました。` } };
        j++;
      }
      k++;
    }
    
    while (i < n1) {
      arr[k] = L[i];
      yield { arr, active: [k], sorted: [], activeLine: 21, variables: { 'L[i]': L[i] }, message: { title: `残りの値を配置`, desc: `左側に残っていた要素(${L[i]})をそのまま配置します。` } };
      i++; k++;
    }
    while (j < n2) {
      arr[k] = R[j];
      yield { arr, active: [k], sorted: [], activeLine: 22, variables: { 'R[j]': R[j] }, message: { title: `残りの値を配置`, desc: `右側に残っていた要素(${R[j]})をそのまま配置します。` } };
      j++; k++;
    }
  }

  yield* mergeSort(a, 0, a.length - 1);
}

async function* quickSortWrapper(array: number[]) {
  const a = [...array];

  async function* quickSort(arr: number[], low: number, high: number): AsyncGenerator<any, void, unknown> {
    if (low < high) {
      let pi = -1;
      const gen = partition(arr, low, high);
      let result = await gen.next();
      while (!result.done) {
        yield result.value;
        result = await gen.next();
      }
      pi = result.value as number;
      
      yield { arr, active: [pi], sorted: [pi], activeLine: 3, variables: { 'pi': arr[pi] }, message: { title: `基準値の確定`, desc: `ピボット(${arr[pi]})の最終的な位置が確定しました。この位置より左は小さく、右は大きな値になっています。` } };
      yield* quickSort(arr, low, pi - 1);
      yield* quickSort(arr, pi + 1, high);
    }
  }

  async function* partition(arr: number[], low: number, high: number) {
    const pivot = arr[high];
    yield { arr, active: [high], sorted: [], activeLine: 10, variables: { 'pivot': pivot }, message: { title: `ピボットの選択: ${pivot}`, desc: `区間の末尾の要素(${pivot})をピボット（基準値）として選択しました。この基準より小さいものを左へ、大きいものを右へ分けます。` } };
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
      yield { arr, active: [j, high], sorted: [], activeLine: 13, variables: { 'arr[j]': arr[j], 'pivot': pivot }, message: { title: `ピボットとの比較`, desc: `現在の要素(${arr[j]})とピボット(${pivot})を比較しています。` } };
      if (arr[j] < pivot) {
        i++;
        yield { arr, active: [i, j], sorted: [], activeLine: 15, variables: { 'arr[i]': arr[i], 'arr[j]': arr[j] }, message: { title: `要素の入れ替え`, desc: `要素(${arr[j]})はピボットより小さいため、左側のグループに追加するために交換を行います。` } };
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield { arr, active: [i, j], sorted: [], activeLine: 15, variables: { 'arr[i]': arr[i], 'arr[j]': arr[j] }, message: { title: `交換完了`, desc: `要素が左側のグループに移動しました。` } };
      }
    }
    yield { arr, active: [i + 1, high], sorted: [], activeLine: 18, variables: { 'arr[i+1]': arr[i+1], 'arr[high]': arr[high] }, message: { title: `ピボットの移動`, desc: `全ての比較が終了したため、ピボット(${pivot})を最終的な境界位置（左グループの直後）へ移動します。` } };
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield { arr, active: [i + 1, high], sorted: [], activeLine: 18, variables: { 'arr[i+1]': arr[i+1], 'arr[high]': arr[high] }, message: { title: `ピボットの配置完了`, desc: `ピボットが適切な境界位置に配置されました。` } };
    return (i + 1);
  }

  yield* quickSort(a, 0, a.length - 1);
}

async function* heapSort(array: number[]) {
  const a = [...array];
  const n = a.length;

  async function* heapify(arr: number[], n: number, i: number): AsyncGenerator<any, void, unknown> {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    yield { arr, active: [i, l, r].filter(x => x < n), sorted: [], activeLine: 16, variables: { 'arr[l]': l < n ? arr[l] : 'N/A', 'arr[largest]': arr[largest] }, message: { title: `ヒープ構造の調整`, desc: `親ノード(${arr[i]})とその子ノード間で、最大値が親になるように比較・調整（ヒープ化）を行っています。` } };

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
      yield { arr, active: [i, largest], sorted: [], activeLine: 19, variables: { 'largest': largest, 'i': i }, message: { title: `親子の入れ替え`, desc: `子ノード(${arr[largest]})の方が親ノードより大きいため、位置を交換してヒープの性質を維持します。` } };
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      yield { arr, active: [i, largest], sorted: [], activeLine: 20, variables: { 'arr[i]': arr[i], 'arr[largest]': arr[largest] }, message: { title: `入れ替え完了`, desc: `親子を交換しました。影響を受けた下位ツリーに対してもヒープ化を続行します。` } };
      yield* heapify(arr, n, largest);
    }
  }

  yield { arr: a, active: [], sorted: [], activeLine: 4, message: { title: `初期ヒープの構築`, desc: `まず、配列全体から最大値が必ず頂点（先頭）に来る「最大ヒープ（Max-Heap）」という木構造を構築します。` } };
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(a, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    yield { arr: a, active: [0, i], sorted: [], activeLine: 8, variables: { 'arr[0]': a[0], 'arr[i]': a[i] }, message: { title: `最大値の取り出し`, desc: `ヒープの頂点にある現在最大の要素(${a[0]})を、未ソート部分の末尾(${a[i]})と交換して位置を確定させます。` } };
    [a[0], a[i]] = [a[i], a[0]];
    yield { arr: a, active: [0, i], sorted: [], activeLine: 9, message: { title: `残りの再ヒープ化`, desc: `最大値を取り出したため、残りの要素で再び最大ヒープの構造を満たすよう再帰的に調整を行います。` } };
    yield* heapify(a, i, 0);
  }
}

// Modal closing logic
document.getElementById('modal-close')?.addEventListener('click', () => {
  document.getElementById('modal-overlay')?.classList.remove('active');
});

document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    (e.target as HTMLElement).classList.remove('active');
  }
});

// Initialize
renderCards();
