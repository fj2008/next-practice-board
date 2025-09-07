export const metadata = {
    title: "학습용 게시판",
    description: "Next.js 연습 프로젝트",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body style={{margin: 0, fontFamily: "system-ui, sans-serif"}}>
        <header
            style={{
                padding: "12px 16px",
                borderBottom: "1px solid #eee",
                display: "flex",
                gap: 12,
            }}
        >
            <a href="/" style={{fontWeight: 700}}>학습용 게시판</a>
            <nav style={{display: "flex", gap: 10}}>
                <a href="/board">목록</a>
                <a href="/board/write">글쓰기</a>
            </nav>
        </header>
        <main style={{maxWidth: 820, margin: "20px auto", padding: "0 16px"}}>
            {children}
        </main>
        </body>
        </html>
    );
}