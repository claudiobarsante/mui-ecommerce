import React from 'react';
import Link from 'next/link';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import * as S from './styles';

import { useRouter } from 'next/router';
import { ListItemText } from '@mui/material';
type Props = {
  text: string;
  href: string;
};

const TopMenuLink = ({ text, href }: Props) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  console.log('isActive', router.asPath);
  return (
    <Link href={`${href}`} passHref>
      <S.LinkContainer>
        {isActive && <BookmarkBorderIcon />}
        <ListItemText primary={text} />
      </S.LinkContainer>
    </Link>
  );
};

export default TopMenuLink;
