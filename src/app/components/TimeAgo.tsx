'use client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ReactTimeAgo from 'react-timeago';

export default function TimeAgo({createdAt}:{createdAt:string}) {
    return (
        <>
            <ReactTimeAgo date={createdAt}/>
        </>
    );
}