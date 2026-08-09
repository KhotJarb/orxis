const fs = require('fs');
const path = require('path');

const locales = ['th', 'zh', 'ja', 'ko', 'es', 'id'];
const root = 'c:/Users/Admin/Desktop/Others/AI CIs Generator/ai-cis-generator/src/i18n/locales';

const translations = {
  th: {
    overview: 'รุ่นนี้ได้กำหนดสถาปัตยกรรมแพลตฟอร์มพื้นฐาน ระบบการออกแบบ และฟีเจอร์หลักทั้งหมดสำหรับผู้ใช้ Orxis ทำงานในเบราว์เซอร์ทั้งหมด — ไม่มีบัญชี ไม่มี API keys และไม่มีข้อมูลออกจากอุปกรณ์',
    categories: {
      Features: {
        label: 'คุณสมบัติ',
        items: [
          'เปิดตัวเครื่องมือสร้างคำสั่ง Orxis หลัก กระบวนการสร้างทั้งหมดทำงานฝั่งไคลเอนต์ — ไม่มีเซิร์ฟเวอร์ประมวลผลข้อมูลของคุณ และไม่ต้องใช้ข้อมูลประจำตัวในการใช้งานเครื่องมือ',
          'แนะนำสถาปัตยกรรมคำสั่งหกส่วน — บทบาทและเอกลักษณ์, ภารกิจ, ลูปการรับรู้, บริบทและข้อมูลเข้า, ขอบเขตและกฎการดำเนินการ, และรูปแบบผลลัพธ์ — ที่สร้างพรอมต์ระบบที่มีโครงสร้างและพร้อมวาง',
          'สร้าง Output Studio: อินเทอร์เฟซเฉพาะสำหรับตรวจสอบ คัดลอก และตรวจสอบคำสั่งที่สร้างขึ้นตามส่วน รวมถึงการนับตัวอักษรแบบเรียลไทม์',
          'เพิ่มการเปรียบเทียบก่อน/หลังบนหน้าแรก แสดงให้เห็นถึงความแตกต่างในทางปฏิบัติระหว่างการตอบสนองของ AI ที่ไม่มีโครงสร้างและมีโครงสร้างต่อพรอมต์เดียวกัน',
          'เพิ่ม Prompt Gallery ที่ /gallery สำหรับการเรียกดูและอ้างอิงเทมเพลตคำสั่งที่สนับสนุนโดยชุมชน',
          'เผยแพร่ส่วน Use Cases ครอบคลุมเวิร์กโฟลว์เชิงปฏิบัติสำหรับนักพัฒนาซอฟต์แวร์ ผู้สร้างเนื้อหา และวิศวกรพรอมต์'
        ]
      },
      Design: {
        label: 'การออกแบบ',
        items: [
          'แนะนำเอกลักษณ์ทางภาพของ Orxis: เครื่องหมายโลโก้ที่กำหนดเอง ระบบเน้นการไล่ระดับสี Periwinkle ถึง Violet และอินเทอร์เฟซที่เน้นสีเข้มสำหรับการใช้งานเป็นเวลานาน',
          'ใช้ระบบธีมที่สอดคล้องกันในทุกหน้า เพื่อให้แน่ใจว่าสี ระยะห่าง และการจัดรูปแบบตัวอักษรกลมกลืนกันทั่วทั้งผลิตภัณฑ์',
          'องค์ประกอบการ์ดและพื้นผิวใช้การจัดการแบบ glassmorphism — ชั้นความลึกฝ้า ขอบที่ละเอียดอ่อน และไฮไลท์เน้นสีนีออนในสถานะการโต้ตอบ — เพื่อรักษาระดับความสำคัญทางภาพที่ชัดเจน'
        ]
      },
      Platform: {
        label: 'แพลตฟอร์ม',
        items: [
          'แอปสามารถติดตั้งได้โดยตรงจากเบราว์เซอร์ของคุณเป็น Progressive Web App บนเดสก์ท็อปและอุปกรณ์มือถือที่รองรับ — ไม่ต้องใช้แอปสโตร์',
          'เพิ่มหน้าการตั้งค่าด้วยรูปแบบที่มีโครงสร้าง พร้อมขยายเมื่อมีการแนะนำตัวเลือกการกำหนดค่าใหม่ในการอัปเดตในอนาคต'
        ]
      },
      'Legal & Transparency': {
        label: 'กฎหมายและความโปร่งใส',
        items: [
          'เผยแพร่นโยบายความเป็นส่วนตัว ข้อกำหนดในการให้บริการ และหน้าใบอนุญาต — แต่ละหน้าเข้าถึงได้จากส่วนท้ายของเว็บไซต์',
          'นโยบายความเป็นส่วนตัวบันทึกรูปแบบข้อมูล local-first ของเรา: ข้อมูลที่คุณป้อนได้รับการประมวลผลทั้งหมดภายในเซสชันของเบราว์เซอร์และจะไม่ถูกส่งหรือจัดเก็บไว้ในเซิร์ฟเวอร์ภายนอก',
          'ข้อกำหนดในการให้บริการกำหนดการใช้งานที่ยอมรับได้ด้วยภาษาที่ชัดเจน หน้าใบอนุญาตชี้แจงสิทธิ์การใช้งานสำหรับแพลตฟอร์มและสำหรับพรอมต์ที่คุณสร้าง'
        ]
      },
      Documentation: {
        label: 'เอกสารประกอบ',
        items: [
          'เปิดตัวฮับเอกสารประกอบของ Orxis ที่ /docs ครอบคลุมคู่มือเริ่มต้นใช้งานด่วนและข้อมูลอ้างอิงโดยละเอียดสำหรับแต่ละส่วนของคำสั่งทั้งหก',
          'เผยแพร่คู่มือการรวมตามโมเดลสำหรับ ChatGPT, Claude และ Gemini ครอบคลุมวิธีการตั้งค่าที่แนะนำและพฤติกรรมเฉพาะแพลตฟอร์มที่เกี่ยวข้องกับการใช้คำสั่งที่มีโครงสร้าง'
        ]
      }
    }
  },
  zh: {
    overview: '该版本确立了基础平台架构、设计系统和所有核心面向用户的功能。Orxis 完全在浏览器中运行——无账户、无 API 密钥，数据不会离开设备。',
    categories: {
      Features: {
        label: '功能',
        items: [
          '推出了核心的 Orxis 指令生成器。整个生成管道都在客户端运行——没有服务器处理您的输入，也不需要任何凭据即可使用该工具。',
          '引入了六部分指令架构——角色与身份、任务、认知循环、上下文与输入、边界与执行规则以及输出格式——可生成结构化的、可直接粘贴的系统提示。',
          '构建了输出工作室（Output Studio）：一个专用界面，用于按部分审查、复制和检查生成的指令。包含实时字数统计。',
          '在落地页添加了对比图（Before/After），展示了非结构化和结构化的 AI 响应对于同一个提示的实际差异。',
          '在 /gallery 增加了提示词画廊（Prompt Gallery），用于浏览和参考社区贡献的指令模板。',
          '发布了用例（Use Cases）板块，涵盖了软件开发者、内容创作者和提示词工程师的实际工作流。'
        ]
      },
      Design: {
        label: '设计',
        items: [
          '引入了 Orxis 的视觉识别系统：定制徽标、长春花色至紫罗兰色的渐变强调色系统，以及专为长时间使用设计的暗色优先界面。',
          '在所有页面上应用了统一的主题系统，确保整个产品的颜色、间距和排版协调一致。',
          '卡片和表面元素采用了拟物玻璃质感（glassmorphism）处理——磨砂深度层、微妙的边框和交互状态下的霓虹强调高光——以维持清晰的视觉层级。'
        ]
      },
      Platform: {
        label: '平台',
        items: [
          '该应用可作为渐进式 Web 应用（PWA）直接从支持的桌面和移动设备上的浏览器中安装——无需应用商店。',
          '新增了具有结构化布局的设置页面，准备在未来更新中引入新配置选项时进行扩展。'
        ]
      },
      'Legal & Transparency': {
        label: '法律与透明度',
        items: [
          '发布了隐私政策、服务条款和许可页面——均可从网站底部访问。',
          '隐私政策记录了我们本地优先的数据模型：您的输入完全在浏览器会话内处理，永远不会传输到或存储在外部服务器上。',
          '服务条款使用通俗具体的语言定义了可接受的使用方式。许可页面澄清了平台及您生成的提示词的使用权利。'
        ]
      },
      Documentation: {
        label: '文档',
        items: [
          '在 /docs 推出了 Orxis 文档中心，涵盖了快速入门指南和针对六个指令部分每个部分的详细参考。',
          '发布了针对 ChatGPT、Claude 和 Gemini 的不同模型集成指南，涵盖了推荐的设置方法以及与结构化指令使用相关的平台特定行为。'
        ]
      }
    }
  },
  ja: {
    overview: 'このリリースでは、基盤となるプラットフォームアーキテクチャ、デザインシステム、およびすべての主要なユーザー向け機能が確立されました。Orxis は完全にブラウザ内で動作します。アカウントや API キーは不要で、データがデバイスから離れることはありません。',
    categories: {
      Features: {
        label: '機能',
        items: [
          'コアとなる Orxis インストラクションジェネレーターを公開しました。生成パイプライン全体がクライアントサイドで実行されます。サーバーがあなたの入力を処理することはなく、ツールの使用に認証情報は必要ありません。',
          '役割とアイデンティティ、ミッション、認知ループ、コンテキストと入力、境界と実行ルール、および出力フォーマットという6セクションのインストラクションアーキテクチャを導入し、構造化された、すぐに貼り付け可能なシステムプロンプトを生成します。',
          'Output Studio を構築しました: セクションごとに生成されたインストラクションをレビュー、コピー、および検査するための専用インターフェースです。リアルタイムの文字数カウントが含まれています。',
          'ランディングページにビフォー/アフターの比較を追加し、同じプロンプトに対する非構造化および構造化された AI の応答の実際の違いを示しました。',
          'コミュニティが貢献したインストラクションテンプレートを閲覧および参照するための Prompt Gallery を /gallery に追加しました。',
          'ソフトウェア開発者、コンテンツクリエイター、およびプロンプトエンジニア向けの現実的なワークフローをカバーする Use Cases セクションを公開しました。'
        ]
      },
      Design: {
        label: 'デザイン',
        items: [
          'Orxis のビジュアルアイデンティティを導入しました: カスタムロゴマーク、ツルニチニチソウからバイオレットへのグラデーションアクセントシステム、および長時間の使用セッション向けに設計されたダークファーストのインターフェース。',
          'すべてのページに一貫したテーマシステムを適用し、製品全体で色、間隔、タイポグラフィの調和を確保しました。',
          'カードと表面要素にはグラスモーフィズム処理が施されています — フロスト深度レイヤー、微妙なボーダー、およびインタラクション状態でのネオンアクセントハイライト — 明確な視覚的階層を維持するためです。'
        ]
      },
      Platform: {
        label: 'プラットフォーム',
        items: [
          'このアプリは、サポートされているデスクトップおよびモバイルデバイス上のブラウザから直接プログレッシブウェブアプリ (PWA) としてインストール可能です。アプリストアは不要です。',
          '構造化されたレイアウトの Settings ページを追加し、将来のアップデートで新しい設定オプションが導入された際に拡張できるようにしました。'
        ]
      },
      'Legal & Transparency': {
        label: '法律と透明性',
        items: [
          'プライバシーポリシー、利用規約、およびライセンスページを公開しました。それぞれサイトのフッターからアクセスできます。',
          'プライバシーポリシーは、当社のローカルファーストなデータモデルを文書化しています。あなたの入力は完全にブラウザセッション内で処理され、外部サーバーに送信されたり保存されたりすることは決してありません。',
          '利用規約は、許容される使用法を分かりやすく具体的な言葉で定義しています。ライセンスページは、プラットフォームおよびあなたが生成したプロンプトの使用権を明確にしています。'
        ]
      },
      Documentation: {
        label: 'ドキュメント',
        items: [
          '/docs に Orxis ドキュメントハブを公開し、クイックスタートガイドと 6 つのインストラクションセクションそれぞれの詳細なリファレンスをカバーしています。',
          'ChatGPT、Claude、および Gemini 向けのモデル別統合ガイドを公開し、構造化されたインストラクションの使用に関連する推奨されるセットアップ方法とプラットフォーム固有の動作をカバーしています。'
        ]
      }
    }
  },
  ko: {
    overview: '이번 릴리스는 기본적인 플랫폼 아키텍처, 디자인 시스템 및 모든 핵심 사용자 대면 기능을 확립합니다. Orxis는 전적으로 브라우저 내에서 작동합니다 — 계정, API 키가 없으며, 데이터가 기기 외부로 유출되지 않습니다.',
    categories: {
      Features: {
        label: '기능',
        items: [
          '핵심 Orxis 명령어 생성기를 출시했습니다. 전체 생성 파이프라인이 클라이언트 측에서 실행됩니다 — 서버가 입력을 처리하지 않으며 도구를 사용하는 데 자격 증명이 필요하지 않습니다.',
          '역할 및 정체성, 미션, 인지 루프, 컨텍스트 및 입력, 경계 및 실행 규칙, 출력 형식의 6개 섹션으로 구성된 명령어 아키텍처를 도입하여 구조화되고 붙여넣기 준비가 된 시스템 프롬프트를 생성합니다.',
          '출력 스튜디오 구축: 생성된 명령어를 섹션별로 검토, 복사 및 검사하기 위한 전용 인터페이스입니다. 실시간 글자 수가 포함됩니다.',
          '랜딩 페이지에 전/후 비교를 추가하여 동일한 프롬프트에 대한 구조화되지 않은 AI 응답과 구조화된 AI 응답의 실제 차이를 보여줍니다.',
          '커뮤니티가 기여한 명령어 템플릿을 찾아보고 참조할 수 있는 프롬프트 갤러리를 /gallery에 추가했습니다.',
          '소프트웨어 개발자, 콘텐츠 제작자 및 프롬프트 엔지니어를 위한 실용적인 워크플로를 다루는 사용 사례 섹션을 게시했습니다.'
        ]
      },
      Design: {
        label: '디자인',
        items: [
          'Orxis 시각적 정체성 도입: 맞춤형 로고 마크, 페리윙클에서 바이올렛으로 이어지는 그라디언트 액센트 시스템, 장시간 사용에 맞게 설계된 다크 퍼스트 인터페이스.',
          '모든 페이지에 일관된 테마 시스템을 적용하여 제품 전체에서 일관된 색상, 간격 및 타이포그래피를 보장합니다.',
          '카드 및 표면 요소는 명확한 시각적 계층 구조를 유지하기 위해 반투명 깊이 레이어, 미묘한 테두리 및 상호 작용 상태의 네온 액센트 하이라이트와 같은 글래스모피즘 처리를 사용합니다.'
        ]
      },
      Platform: {
        label: '플랫폼',
        items: [
          '앱은 지원되는 데스크톱 및 모바일 장치의 브라우저에서 직접 프로그레시브 웹 앱(PWA)으로 설치할 수 있습니다 — 앱 스토어가 필요하지 않습니다.',
          '구조화된 레이아웃이 있는 설정 페이지를 추가하여 향후 업데이트에서 새로운 구성 옵션이 도입될 때 확장할 수 있도록 준비했습니다.'
        ]
      },
      'Legal & Transparency': {
        label: '법률 및 투명성',
        items: [
          '개인정보 처리방침, 서비스 약관 및 라이선스 페이지를 게시했습니다 — 각각 사이트 바닥글에서 액세스할 수 있습니다.',
          '개인정보 처리방침은 로컬 우선 데이터 모델을 문서화합니다. 귀하의 입력은 전적으로 브라우저 세션 내에서 처리되며 외부 서버로 전송되거나 저장되지 않습니다.',
          '서비스 약관은 명확하고 구체적인 언어로 허용되는 사용을 정의합니다. 라이선스 페이지는 플랫폼 및 사용자가 생성한 프롬프트에 대한 사용 권한을 명확히 합니다.'
        ]
      },
      Documentation: {
        label: '문서',
        items: [
          '/docs에 빠른 시작 가이드와 6개의 명령어 섹션 각각에 대한 자세한 참조를 다루는 Orxis 문서 허브를 출시했습니다.',
          '구조화된 명령어 사용과 관련된 권장 설정 방법 및 플랫폼별 동작을 다루는 ChatGPT, Claude 및 Gemini에 대한 모델별 통합 가이드를 게시했습니다.'
        ]
      }
    }
  },
  es: {
    overview: 'Esta versión establece la arquitectura fundamental de la plataforma, el sistema de diseño y todas las funciones principales de cara al usuario. Orxis funciona completamente en el navegador — sin cuentas, sin claves API y los datos no salen del dispositivo.',
    categories: {
      Features: {
        label: 'Características',
        items: [
          'Se lanzó el generador de instrucciones central de Orxis. Todo el proceso de generación se ejecuta en el lado del cliente — ningún servidor procesa sus datos de entrada, y no se requieren credenciales para utilizar la herramienta.',
          'Se introdujo una arquitectura de instrucciones de seis secciones — Rol e Identidad, Misión, Bucle Cognitivo, Contexto y Entrada, Límites y Reglas de Ejecución, y Formato de Salida — que produce indicaciones de sistema estructuradas y listas para pegar.',
          'Se creó el Output Studio: una interfaz dedicada para revisar, copiar e inspeccionar la instrucción generada sección por sección. Incluye un recuento de caracteres en vivo.',
          'Se agregó una comparación de Antes/Después en la página de inicio, demostrando la diferencia práctica entre una respuesta de IA no estructurada y una estructurada al mismo mensaje.',
          'Se agregó una Galería de Prompts en /gallery para explorar y hacer referencia a plantillas de instrucciones aportadas por la comunidad.',
          'Se publicó una sección de Casos de Uso que cubre flujos de trabajo prácticos para desarrolladores de software, creadores de contenido e ingenieros de prompts.'
        ]
      },
      Design: {
        label: 'Diseño',
        items: [
          'Se introdujo la identidad visual de Orxis: un logotipo personalizado, un sistema de acento degradado de Pervinca a Violeta y una interfaz de tonos oscuros diseñada para sesiones de uso prolongadas.',
          'Se aplicó un sistema de tematización consistente en cada página, asegurando la coherencia en el color, el espaciado y la tipografía en todo el producto.',
          'Los elementos de tarjetas y superficies utilizan un tratamiento de glassmorfismo — capas de profundidad esmeriladas, bordes sutiles y reflejos de acento de neón en los estados de interacción — para mantener una jerarquía visual clara.'
        ]
      },
      Platform: {
        label: 'Plataforma',
        items: [
          'La aplicación se puede instalar directamente desde su navegador como una Aplicación Web Progresiva (PWA) en dispositivos de escritorio y móviles compatibles — no se requiere una tienda de aplicaciones.',
          'Se agregó una página de Configuración con un diseño estructurado, lista para expandirse a medida que se introduzcan nuevas opciones de configuración en futuras actualizaciones.'
        ]
      },
      'Legal & Transparency': {
        label: 'Legal y Transparencia',
        items: [
          'Se publicaron las páginas de Política de Privacidad, Términos de Servicio y Licencia — cada una accesible desde el pie de página del sitio.',
          'La Política de Privacidad documenta nuestro modelo de datos basado en lo local: sus entradas se procesan completamente dentro de la sesión del navegador y nunca se transmiten ni almacenan en servidores externos.',
          'Los Términos de Servicio definen el uso aceptable en un lenguaje sencillo y específico. La página de Licencia aclara los derechos de uso para la plataforma y para los prompts que usted genere.'
        ]
      },
      Documentation: {
        label: 'Documentación',
        items: [
          'Se lanzó el centro de documentación de Orxis en /docs, que cubre una guía de inicio rápido y una referencia detallada para cada una de las seis secciones de instrucciones.',
          'Se publicaron guías de integración por modelo para ChatGPT, Claude y Gemini, que cubren los métodos de configuración recomendados y los comportamientos específicos de la plataforma relevantes para el uso de instrucciones estructuradas.'
        ]
      }
    }
  },
  id: {
    overview: 'Rilis ini menetapkan arsitektur platform dasar, sistem desain, dan semua fitur inti yang berhadapan dengan pengguna. Orxis beroperasi sepenuhnya di dalam browser — tanpa akun, tanpa kunci API, dan tidak ada data yang keluar dari perangkat.',
    categories: {
      Features: {
        label: 'Fitur',
        items: [
          'Meluncurkan generator instruksi inti Orxis. Seluruh proses pembuatan berjalan di sisi klien — tidak ada server yang memproses masukan Anda, dan kredensial tidak diperlukan untuk menggunakan alat ini.',
          'Memperkenalkan arsitektur instruksi enam bagian — Peran & Identitas, Misi, Lingkaran Kognitif, Konteks & Masukan, Batasan & Aturan Eksekusi, dan Pemformatan Keluaran — yang menghasilkan prompt sistem terstruktur yang siap tempel.',
          'Membangun Studio Keluaran: antarmuka khusus untuk meninjau, menyalin, dan memeriksa instruksi yang dihasilkan berdasarkan bagian. Termasuk penghitungan karakter langsung.',
          'Menambahkan perbandingan Sebelum/Sesudah di beranda, menunjukkan perbedaan praktis antara respons AI yang tidak terstruktur dan terstruktur terhadap prompt yang sama.',
          'Menambahkan Galeri Prompt di /gallery untuk menjelajahi dan merujuk templat instruksi yang disumbangkan oleh komunitas.',
          'Menerbitkan bagian Kasus Penggunaan yang mencakup alur kerja praktis untuk pengembang perangkat lunak, pembuat konten, dan insinyur prompt.'
        ]
      },
      Design: {
        label: 'Desain',
        items: [
          'Memperkenalkan identitas visual Orxis: tanda logo kustom, sistem aksen gradien Periwinkle ke Violet, dan antarmuka dark-first yang dirancang untuk sesi penggunaan yang lebih lama.',
          'Menerapkan sistem tema yang konsisten di setiap halaman, memastikan warna, jarak, dan tipografi yang koheren di seluruh produk.',
          'Elemen kartu dan permukaan menggunakan perawatan glassmorphism — lapisan kedalaman buram, bingkai halus, dan sorotan aksen neon pada status interaksi — untuk mempertahankan hierarki visual yang jelas.'
        ]
      },
      Platform: {
        label: 'Platform',
        items: [
          'Aplikasi ini dapat diinstal langsung dari browser Anda sebagai Progressive Web App (PWA) di desktop dan perangkat seluler yang didukung — tidak perlu toko aplikasi.',
          'Menambahkan halaman Pengaturan dengan tata letak terstruktur, siap diperluas saat opsi konfigurasi baru diperkenalkan di pembaruan mendatang.'
        ]
      },
      'Legal & Transparency': {
        label: 'Hukum & Transparansi',
        items: [
          'Menerbitkan halaman Kebijakan Privasi, Ketentuan Layanan, dan Lisensi — masing-masing dapat diakses dari catatan kaki situs.',
          'Kebijakan Privasi mendokumentasikan model data local-first kami: masukan Anda diproses sepenuhnya dalam sesi browser dan tidak pernah dikirimkan ke atau disimpan di server eksternal.',
          'Ketentuan Layanan mendefinisikan penggunaan yang dapat diterima dalam bahasa yang jelas dan spesifik. Halaman Lisensi mengklarifikasi hak penggunaan untuk platform dan untuk prompt yang Anda hasilkan.'
        ]
      },
      Documentation: {
        label: 'Dokumentasi',
        items: [
          'Meluncurkan hub dokumentasi Orxis di /docs, mencakup panduan memulai cepat dan referensi terperinci untuk masing-masing dari enam bagian instruksi.',
          'Menerbitkan panduan integrasi per-model untuk ChatGPT, Claude, dan Gemini, mencakup metode pengaturan yang disarankan dan perilaku spesifik platform yang relevan dengan penggunaan instruksi terstruktur.'
        ]
      }
    }
  }
};

for (const loc of locales) {
  const filePath = path.join(root, loc, 'pages.json');
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    
    // We are replacing changelog.releases with the translated version
    const enKeys = ["Features", "Design", "Platform", "Legal & Transparency", "Documentation"];
    
    if (data.changelog && data.changelog.releases) {
      data.changelog.releases = [
        {
          version: "v0.1.0",
          date: "July 13, 2026",
          tag: "Initial Release",
          overview: translations[loc].overview,
          categories: enKeys.map(key => ({
            labelKey: key,
            label: translations[loc].categories[key].label,
            items: translations[loc].categories[key].items
          }))
        }
      ];
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`Updated ${loc}`);
    }
  }
}
