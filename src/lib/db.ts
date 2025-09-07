import {Post} from "@/types/post";

const now = () => new Date().toISOString();

class InMemoryDB {
    private posts = new Map<string, Post>();

    constructor() {
        const seed: Array<Omit<Post, "id"> & { id?: string }> = [
            {
                id: crypto.randomUUID(),
                title: "첫 글: 환영합니다",
                content: "Next.js 학습용 게시판입니다.",
                author: "관리자",
                createdAt: now(),
                updatedAt: now(),
            },
            {
                id: crypto.randomUUID(),
                title: "둘째 글: 사용법",
                content: "상단에서 글쓰기 → 목록에서 클릭 → 상세 보기.",
                author: "관리자",
                createdAt: now(),
                updatedAt: now(),
            },
        ];
        seed.forEach((p) => this.posts.set(p.id!, p as Post));
    }

    list(): Post[] {
        return Array.from(this.posts.values()).sort(
            (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
        );
    }

    get(id: string): Post | undefined {
        return this.posts.get(id);
    }

    create(input: Pick<Post, "title" | "content" | "author">): Post {
        const post: Post = {
            id: crypto.randomUUID(),
            title: input.title,
            content: input.content,
            author: input.author,
            createdAt: now(),
            updatedAt: now(),
        };
        this.posts.set(post.id, post);
        return post;
    }

    update(
        id: string,
        patch: Partial<Pick<Post, "title" | "content" | "author">>
    ): Post | undefined {
        const cur = this.posts.get(id);
        if (!cur) return undefined;
        const next: Post = {
            ...cur,
            ...patch,
            updatedAt: now(),
        };
        this.posts.set(id, next);
        return next;
    }

    delete(id: string): boolean {
        return this.posts.delete(id);
    }
}

export const db = new InMemoryDB();