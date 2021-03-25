export type State<S, A> = (initialState: S) => [S, A];

export const bind: <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => State<S, B> = 
    <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => {
        return (pre: S) => {
            const [post,x] : [S, A] = state(pre);
            return f(x)(post);
        }        
    };

