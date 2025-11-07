'use client';

import { useState, useMemo } from 'react';

type KeywordResult = {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  note: string;
};

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState('KR');
  const [lang, setLang] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<KeywordResult[]>([]);

  // 키워드 2글자 이상일 때만 실행 허용
  const canRun = useMemo(() => keyword.trim().length >= 2, [keyword]);

  const onRun = () => {
    if (!canRun || loading) return;

    setError('');
    setResults([]);
    setLoading(true);

    // 실제 API 대신 "샘플 결과" 생성 (모양 확인용)
    setTimeout(() => {
      const base = keyword.trim();

      const mock: KeywordResult[] = [
        {
          keyword: `${base} 추천`,
          volume: 4400,
          difficulty: 32,
          cpc: 720,
          note: '구매 의도 강함 · 상위 노출 시 수익 기대',
        },
        {
          keyword: `${base} 후기`,
          volume: 2900,
          difficulty: 27,
          cpc: 540,
          note: '리뷰형 컨텐츠 적합 · 블로그형 추천',
        },
        {
          keyword: `${base} 비교`,
          volume: 1900,
          difficulty: 24,
          cpc: 610,
          note: '비교/가이드 글용 · 체류시간 유리',
        },
      ];

      setResults(mock);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-bold">🔑 황금키워드 자동 분석기</h1>
        <p className="mt-2 text-sm text-gray-500">
          스텝2-3: 결과 패널(샘플 데이터)까지 구성. 다음 스텝에서 실제 데이터/로직 연결.
        </p>

        {/* 입력 영역 */}
        <section className="mt-6 space-y-4 rounded-2xl border border-gray-200 p-5">
          <div>
            <label className="block text-sm font-medium">키워드</label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="예: 무선충전 보조배터리"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-black"
            />
            {!canRun && (
              <p className="mt-1 text-xs text-red-500">
                키워드를 <b>2자 이상</b> 입력하세요.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">국가</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
              >
                <option value="KR">대한민국 (KR)</option>
                <option value="US">미국 (US)</option>
                <option value="JP">일본 (JP)</option>
                <option value="DE">독일 (DE)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">언어</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
              >
                <option value="ko">한국어 (ko)</option>
                <option value="en">영어 (en)</option>
                <option value="ja">일본어 (ja)</option>
                <option value="de">독일어 (de)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
            <div className="text-sm text-gray-600">
              <div>검색엔진: Google (고정)</div>
              <div>데이터 소스: 현재는 샘플 · 추후 실데이터 연동</div>
            </div>

            <button
              onClick={onRun}
              disabled={!canRun || loading}
              className={
                (canRun && !loading
                  ? 'bg-black text-white hover:opacity-90 '
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed ') +
                'rounded-xl px-4 py-2 border border-gray-300'
              }
              title={
                !canRun
                  ? '키워드를 2자 이상 입력하세요'
                  : loading
                  ? '분석 중...'
                  : '입력값으로 분석 실행'
              }
            >
              {loading ? '분석 중...' : '분석 시작'}
            </button>
          </div>

          {error && (
            <div className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}
        </section>

        {/* 결과 영역 */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-gray-700">
            📊 추천 키워드 후보 (샘플 데이터)
          </h2>

          {loading && (
            <div className="mt-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
              키워드 구조 분석 중입니다...
            </div>
          )}

          {!loading && results.length === 0 && (
            <p className="mt-3 text-xs text-gray-400">
              위에서 키워드를 입력하고 &apos;분석 시작&apos;을 누르면 결과가 여기에 표시됩니다.
            </p>
          )}

          {!loading && results.length > 0 && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200">
              <table className="min-w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-2">키워드</th>
                    <th className="px-4 py-2">검색량(가상)</th>
                    <th className="px-4 py-2">경쟁도</th>
                    <th className="px-4 py-2">예상 CPC</th>
                    <th className="px-4 py-2">메모</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr
                      key={r.keyword}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-4 py-2 font-medium text-gray-800">
                        {r.keyword}
                      </td>
                      <td className="px-4 py-2">{r.volume.toLocaleString()}</td>
                      <td className="px-4 py-2">{r.difficulty}</td>
                      <td className="px-4 py-2">
                        ₩ {r.cpc.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="mt-4 text-xs text-gray-400">
          v0.3 · UI + 입력 검증 + 샘플 결과 표시 · 다음: 실제 데이터 소스 연동 설계
        </div>
      </div>
    </main>
  );
}
