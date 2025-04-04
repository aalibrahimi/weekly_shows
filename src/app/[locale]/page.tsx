"use client"
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <> 
      <h3>{t('title')}</h3>
    </>
  );
}
