import React, { useMemo, useEffect, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import { Provider } from './context'
import { useFormContext } from '../context'

const GroupRoot = ({ children }) => {
  const groupId = useMemo(() => Symbol(uniqueId(`group_`)), [])
  const [groupMap, setGroupMap] = useState({})
  const { emitter } = useFormContext()
  useEffect(() => {
    const sub1 = emitter.addListener('form-group-add', ({ id, parentId }) => {
      setGroupMap(oldGroupMap => {
        const newGroupMap = Object.assign({}, oldGroupMap)
        if (!newGroupMap[parentId]) {
          newGroupMap[parentId] = []
        }
        const newList = newGroupMap[parentId].slice(0)
        newList.push(id)
        newGroupMap[parentId] = newList
        return newGroupMap
      })
    })
    const sub2 = emitter.addListener('form-group-remove', ({ id, parentId }) => {
      setGroupMap(oldGroupMap => {
        const newGroupMap = Object.assign({}, oldGroupMap)
        const newList = newGroupMap[parentId].slice(0)
        const index = newList.index(id)
        newList.splice(index, 1)
        newGroupMap[parentId] = newList
        return newGroupMap
      })
    })
    return () => {
      sub1.remove()
      sub2.remove()
    }
  }, [emitter])
  return <Provider value={{ id: groupId, groupMap }}>{children}</Provider>
}

export default GroupRoot
