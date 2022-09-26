import type { IApi } from '#/form'
import type { SelectProps } from 'antd'
import type { DefaultOptionType } from 'antd/lib/select'
import { Select } from 'antd'
import { useState } from 'react'
import { MAX_TAG_COUNT, PLEASE_SELECT } from '@/utils/config'
import Loading from '../Loading'

interface IProps extends SelectProps {
  api: IApi;
  params?: object;
}

/**
 * @description: 根据API获取数据下拉组件
 */
function ApiSelect(props: IProps) {
  const { api } = props
  const [isLoading, setLoading] = useState(false)
  const [options, setOptions] = useState<DefaultOptionType[]>([])

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
    <Select
      allowClear={true}
      maxTagCount={MAX_TAG_COUNT}
      placeholder={PLEASE_SELECT}
      optionFilterProp='label'
      {...props}
      loading={isLoading}
      options={options}
      notFoundContent={isLoading && <Loading />}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  )
}

export default ApiSelect