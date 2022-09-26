import type { IApi } from '#/form'
import type { TreeSelectProps } from 'antd'
import { TreeSelect } from 'antd'
import { useState } from 'react'
import { MAX_TAG_COUNT, PLEASE_SELECT } from '@/utils/config'
import Loading from '../Loading'

interface IProps extends TreeSelectProps {
  api: IApi;
  params?: object;
}

/**
 * @description: 根据API获取数据下拉树形组件
 */
function ApiTreeSelect(props: IProps) {
  const { api } = props
  const [isLoading, setLoading] = useState(false)
  const [options, setOptions] = useState<TreeSelectProps['treeData']>([])

  /** 获取接口数据 */
  const getApiData = async () => {
    try {
      setLoading(true)
      const data = await api?.(props?.params)
      setOptions(data || [])
    } finally {
      setLoading(false)
    }
  }

  /**
   * 展开下拉回调
   * @param open - 是否展开
   */
  const onDropdownVisibleChange = (open: boolean) => {
    console.log(open)
    if (open) {
      getApiData()
    }

    props.onDropdownVisibleChange?.(open)
  }

  return (
    <TreeSelect
      allowClear={true}
      maxTagCount={MAX_TAG_COUNT}
      placeholder={PLEASE_SELECT}
      {...props}
      loading={isLoading}
      treeData={options}
      notFoundContent={isLoading && <Loading />}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  )
}

export default ApiTreeSelect