import { SWRConfig } from 'swr'
import { InferGetServerSidePropsType } from 'next'
import { getArticle, getCategories } from 'hooks/getArticle'
import { Box } from '@pancakeswap/uikit'
import NewBlog from 'components/NewBlog'
import SarcoinChoice from 'components/SarcoinChoice'
import AllArticle from 'components/Article/AllArticle'
import { filterTagArray } from 'utils/filterTagArray'

export async function getStaticProps() {
  const [latestArticles, sarcoinChoiceArticle, categories] = await Promise.all([
    getArticle({
      url: '/articles',
      urlParamsObject: {
        populate: 'categories,image',
        sort: 'createAt:desc',
        pagination: { limit: 1 },
        filters: {
          categories: {
            name: {
              $notIn: filterTagArray,
            },
          },
        },
      },
    }),
    getArticle({
      url: '/articles',
      urlParamsObject: {
        populate: 'categories,image',
        sort: 'createAt:desc',
        pagination: { limit: 9 },
        filters: {
          categories: {
            name: {
              $eq: 'Sarcoin choice',
            },
          },
        },
      },
    }),
    getCategories(),
  ])

  return {
    props: {
      fallback: {
        '/latestArticles': latestArticles.data,
        '/sarcoinChoiceArticle': sarcoinChoiceArticle.data,
        '/categories': categories,
      },
    },
    revalidate: 60,
  }
}

const BlogPage: React.FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Box width="100%" mb="150px">
        <NewBlog />
        <SarcoinChoice />
        <AllArticle />
      </Box>
    </SWRConfig>
  )
}

export default BlogPage
