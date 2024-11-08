import { useState, useEffect } from "react";
import { ExternalLink, Database, Cpu, Shield, Zap } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const features = [
  {
    id: "seo",
    icon: Database,
    title: "Next.js 최적화",
    shortDesc: "Google Lighthouse SEO 점수 100점 달성",
    details: [
      "Jotai를 활용해 서버 컴포넌트의 fetch 데이터를 SEO를 위한 초기 HTML에 포함시키고 동시에 클라이언트 전역 상태로 쉽게 동기화",
      "가능한 서버 컴포넌트를 사용하여 클라이언트로 전송되는 JS번들 양 감소",
      "TanStack Query를 통한 효율적인 서버 상태 관리",
      "메타데이터 최적화 및 동적 생성",
    ],
  },
  {
    id: "performance",
    icon: Zap,
    title: "S3 이미지 최적화",
    shortDesc: "서버 부하 50% 감소",
    details: [
      "S3 presignedURLPost를 활용한 직접 업로드 시스템",
      "S3에 이미지 저장 시 이미지 키 재사용을 통한 스토리지 최적화",
    ],
  },
  {
    id: "ai",
    icon: Cpu,
    title: "LangChain 기반 자동화",
    shortDesc: "AI 사용 시 콘텐츠 생성 시간 70% 단축",
    details: [
      "LangChain을 활용한 문서 기반 자동 문제 생성",
      "LLM 기반 주관식 문제 자동 채점 시스템",
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "JWT 기반 보안 시스템",
    shortDesc: "철저한 접근 제어 및 데이터 보호",
    details: [
      "사용자별 권한 기반 접근 제어 시스템 구현",
      "비공개 문제집 및 개인정보에 대한 엄격한 접근 제어",
      "JWT 기반 인증 및 인가 시스템",
      "악의적 사용자의 무단 접근 차단",
    ],
  },
];

const stats = [
  { label: "SEO 점수", value: "100점" },
  { label: "서버 부하 감소", value: "50%" },
  { label: "콘텐츠 생성 시간 단축", value: "70%" },
  { label: "초기 로딩 시간 개선", value: "30%" },
];

const techStack = {
  frontend: [
    {
      name: "Next.js 15 (App Router)",
      desc: "SSR 및 다양한 렌더링 방식, 자동 코드 스플리팅, 효율적이고 직관적인 라우팅을 제공하는 React 프레임워크",
    },
    { name: "TypeScript", desc: "정적 타입 지원으로 안정적인 코드 작성" },
    { name: "Tailwind CSS", desc: "유틸리티 기반의 CSS 프레임워크" },
    {
      name: "Jotai",
      desc: "서버 컴포넌트에서의 fetch 데이터를 SEO를 위한 초기 HTML에 포함시키고 동시에 클라이언트 전역 상태로 쉽게 동기화할 수 있는 가벼운 상태 관리 도구",
    },
    {
      name: "TanStack Query",
      desc: "서버 상태 관리 및 캐싱, 옵티미스틱 업데이트 솔루션",
    },
  ],
  backend: [
    {
      name: "Drizzle ORM",
      desc: "TypeScript 기반 ORM으로 타입 안전한 쿼리 작성",
    },
    {
      name: "AWS 인프라",
      desc: [
        "S3: 이미지 저장 및 효율적인 파일 관리",
        "RDS (PostgreSQL): 안정적인 관계형 데이터베이스",
        "Bedrock: AI 모델 서비스 제공",
        "EC2: 애플리케이션 서버 호스팅",
        "CodeDeploy: 자동화된 배포 관리",
        "ALB: 로드 밸런싱 및 트래픽 관리",
      ],
    },
    {
      name: "CI/CD",
      desc: [
        "GitHub Actions: 자동화된 빌드 및 배포 파이프라인",
        "Docker: 컨테이너화를 통해 Next.js buildID 통일 및 동일한 빌드 환경 제공으로 무중단 배포 안정성 확보",
      ],
    },
    { name: "Version Control", desc: "Git/GitHub을 통한 체계적인 버전 관리" },
    { name: "LangChain", desc: "AI 모델 통합 및 문제 생성/채점 파이프라인" },
    { name: "NextAuth (JWT)", desc: "안전한 사용자 인증 시스템" },
  ],
};

const sectionLabels = {
  overview: "소개",
  features: "성과",
  tech: "기술",
} as const;

const sectionKeys = Object.keys(sectionLabels) as Array<
  keyof typeof sectionLabels
>;

export default function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionKeys.map((id) => ({
        id,
        element: document.getElementById(id),
      }));

      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveTab(section.id);
          }
        }
      });

      const winHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (window.scrollY / winHeight) * 100;
      setScrollProgress(scrolled);
      setShowFloatingNav(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-gray-50 to-white">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Navigation */}
      {showFloatingNav && (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-3 z-40">
          <ul className="flex space-x-6">
            {sectionKeys.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => {
                    const element = document.getElementById(tab);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`text-sm ${
                    activeTab === tab ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {sectionLabels[tab]}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Hero Section */}
      <header className="py-20 px-4 relative overflow-hidden" id="overview">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">ExamMaster</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            AI 기반 맞춤형 시험 문제 생성 및 학습 플랫폼으로, 최신 웹 기술과
            인공지능을 활용하여 효율적인 학습 경험을 제공합니다.
          </p>
          <div className="flex gap-4">
            <a
              href="https://exammaster.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              서비스 방문하기
            </a>
            <a
              href="https://github.com/brain1401/exam-master"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition transform hover:scale-105"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Key Features */}
      <section className="py-16 px-4" id="features">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            주요 기술적 성과
          </h2>
          <div className="space-y-6">
            {features.map(({ details, icon: Icon, id, shortDesc, title }) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 leading-6">
                        {title}
                      </h3>
                      <p className="text-gray-600 mt-1">{shortDesc}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pl-10">
                  <ul className="space-y-2">
                    {details.map((detail, index) => (
                      <li
                        key={index}
                        className="text-gray-600 flex items-start"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-gray-50" id="tech">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">기술 스택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                프론트엔드
              </h3>
              {techStack.frontend.map((tech, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-blue-600 mb-2">
                    {tech.name}
                  </h4>
                  <p className="text-sm text-gray-600">{tech.desc}</p>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                백엔드 & 인프라
              </h3>
              {techStack.backend.map((tech, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-blue-600 mb-2">
                    {tech.name}
                  </h4>
                  {Array.isArray(tech.desc) ? (
                    <ul className="text-sm text-gray-600 space-y-1">
                      {tech.desc.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">{tech.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p>© 2024 ExamMaster. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
