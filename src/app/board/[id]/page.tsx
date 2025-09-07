import Link from "next/link";
import {notFound} from "next/navigation";
import {db} from "@/lib/db";

export default function BoardDetailPage({
                                            params,
                                        }: { params: { id: string } }) {
    const post = db.get(params.id);
    if (!post) return notFound();

    return (
        <article>
            <h2 style={{marginBottom: 4}}>{post.title}</h2>
            <div style={{color: "#666", fontSize: 12, marginBottom: 16}}>
                작성자: {post.author} · 등록 {new Date(post.createdAt).toLocaleString("ko-KR")}
                {post.updatedAt !== post.createdAt && (
                    <> · 수정 {new Date(post.updatedAt).toLocaleString("ko-KR")}</>
                )}
            </div>

            <p style={{whiteSpace: "pre-wrap", lineHeight: 1.6}}>{post.content}</p>

            <div style={{display: "flex", gap: 12, marginTop: 20}}>
                <Link href={`/board/${post.id}/edit`}>✏️ 수정</Link>
                <Link href="/board">← 목록</Link>
            </div>
        </article>
    );
}