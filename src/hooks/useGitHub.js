import { useState, useEffect } from 'react'
import axios from 'axios'

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
})

export function useGitHub() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [languages, setLanguages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          api.get(`/users/${USERNAME}`),
          api.get(`/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ])
        setProfile(profileRes.data)
        const sorted = reposRes.data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(sorted)
        const langMap = {}
        sorted.forEach(repo => {
          if (repo.language) langMap[repo.language] = (langMap[repo.language] || 0) + 1
        })
        setLanguages(langMap)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return { profile, repos, languages, loading, error }
}
