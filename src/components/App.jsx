import ModelApp from './model';

function App() {
  return (
    <div className="App">
      <header>
        <h1>構図シミュレータ（仮）</h1>
      </header>
      <div className="main">
        <div className="row-left">
          <div className="general-options">
            <h2>全体の設定</h2>
          </div>
        </div>
        <div className="row-center">
          <div className="camera-view">
            <ModelApp />
          </div>
          <div className="model-select">
            <h2>モデル選択</h2>
          </div>
        </div>
        <div className="row-right">
          <div className="model-options">
            <h2>モデル詳細設定</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;