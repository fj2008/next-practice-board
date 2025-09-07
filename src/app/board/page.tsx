import Link from "next/link";
import {db} from "@/lib/db";

export const dynamic = "force-dynamic"; // dev에서 항상 최신

export default function BoardListPage() {
    const posts = db.list();

    return (
        <section>
            <h2>게시글 목록</h2>
            <div style={{margin: "12px 0 20px"}}>
                <Link href="/board/write">➕ 새 글 쓰기</Link>
            </div>

            {posts.length === 0 ? (
                <p>아직 글이 없습니다. 첫 글을 작성해보세요!</p>
            ) : (
                <ul style={{padding: 0, listStyle: "none", display: "grid", gap: 8}}>
                    {posts.map((p) => (
                        <li
                            key={p.id}
                            style={{
                                border: "1px solid #eee",
                                padding: 12,
                                borderRadius: 8,
                            }}
                        >
                            <Link href={`/board/${p.id}`} style={{fontSize: 18, fontWeight: 600}}>
                                {p.title}
                            </Link>
                            <div style={{color: "#666", fontSize: 12, marginTop: 6}}>
                                작성자: {p.author} · {new Date(p.createdAt).toLocaleString("ko-KR")}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}