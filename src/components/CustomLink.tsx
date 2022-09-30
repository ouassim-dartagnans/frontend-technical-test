import NextLink from 'next/link';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';

export const CustomLink = () => (
  <LinkBox as="article">
    <h2>
      <NextLink href="#" passHref>
        <LinkOverlay>Some blog post</LinkOverlay>
      </NextLink>
    </h2>
    <p>
      As a side note, using quotation marks around an attribute value is required only if this value is not a valid
      identifier.
    </p>
    <a href="#">Some inner link</a>
  </LinkBox>
);
