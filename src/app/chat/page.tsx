import { Suspense } from 'react';
import CardWrapper from '../ui/dashboard/cards';
import { CardSkeleton } from '../ui/skeletons';
export default async function chat(){
 return (
    <>
     <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
        </>
 )
}
