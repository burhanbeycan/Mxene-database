import { useState, useEffect, useMemo } from 'react'
import Papa from 'papaparse'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  FlaskConical,
  Atom,
  Sparkles,
  TrendingUp,
  Info
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMetal, setSelectedMetal] = useState('all')
  const [selectedFunctionalization, setSelectedFunctionalization] = useState('all')
  const [sortBy, setSortBy] = useState('Best_Binding_All_Targets')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load CSV data
        const csvResponse = await fetch('/Mxene-database/mxene_comprehensive_database.csv')
        const csvText = await csvResponse.text()
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data.filter(row => row.ID)) // Filter out empty rows
          }
        })

        // Load summary
        const summaryResponse = await fetch('/Mxene-database/database_summary.json')
        const summaryData = await summaryResponse.json()
        setSummary(summaryData)
        
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = data

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(row => 
        (row.MXene_Base && row.MXene_Base.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.Product_Group && row.Product_Group.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (row.SMILES_Clean && row.SMILES_Clean.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Metal filter
    if (selectedMetal !== 'all') {
      filtered = filtered.filter(row => row.Metal === selectedMetal)
    }

    // Functionalization filter
    if (selectedFunctionalization !== 'all') {
      filtered = filtered.filter(row => row.Functionalization_Type === selectedFunctionalization)
    }

    // Sort
    filtered.sort((a, b) => {
      const aVal = a[sortBy] || 0
      const bVal = b[sortBy] || 0
      return sortBy.includes('Binding') ? aVal - bVal : bVal - aVal
    })

    return filtered
  }, [data, searchTerm, selectedMetal, selectedFunctionalization, sortBy])

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredData.slice(start, start + itemsPerPage)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // Get unique values for filters
  const uniqueMetals = useMemo(() => 
    [...new Set(data.map(row => row.Metal))].filter(Boolean).sort(),
    [data]
  )

  const uniqueFunctionalizations = useMemo(() => 
    [...new Set(data.map(row => row.Functionalization_Type))].filter(Boolean).sort(),
    [data]
  )

  // Prepare chart data
  const metalDistribution = useMemo(() => {
    if (!summary) return []
    return Object.entries(summary.metal_distribution || {})
      .map(([metal, count]) => ({ metal, count }))
      .sort((a, b) => b.count - a.count)
  }, [summary])

  const functionalizationDistribution = useMemo(() => {
    if (!summary) return []
    return Object.entries(summary.functionalization_distribution || {})
      .map(([type, count]) => ({ type: type.replace(/_/g, ' '), count }))
      .sort((a, b) => b.count - a.count)
  }, [summary])

  const bindingEnergyDistribution = useMemo(() => {
    const bins = {}
    filteredData.forEach(row => {
      const energy = row.Best_Binding_All_Targets
      if (energy) {
        const bin = Math.floor(energy)
        bins[bin] = (bins[bin] || 0) + 1
      }
    })
    return Object.entries(bins)
      .map(([energy, count]) => ({ energy: parseFloat(energy), count }))
      .sort((a, b) => a.energy - b.energy)
  }, [filteredData])

  const logPvsMW = useMemo(() => {
    return filteredData.slice(0, 500).map(row => ({
      LogP: row.LogP,
      MW: row.MolecularWeight,
      name: row.Product_Group
    }))
  }, [filteredData])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <FlaskConical className="w-16 h-16 animate-bounce mx-auto mb-4 text-indigo-600" />
          <p className="text-xl font-semibold text-gray-700">Loading MXene Database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Atom className="w-10 h-10 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MXene Functionalization Database</h1>
                <p className="text-sm text-gray-600">Comprehensive computational properties and binding energies</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Database className="w-4 h-4 mr-2" />
              {data.length.toLocaleString()} Entries
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Database
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="top-binders" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Top Binders
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">Total Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{summary?.total_entries.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">MXene Bases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{summary?.unique_mxene_bases}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">Functional Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{summary?.unique_functional_groups}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium opacity-90">Best Binding</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{summary?.binding_energy_range.min.toFixed(2)}</div>
                  <div className="text-sm opacity-90">kcal/mol</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database Statistics</CardTitle>
                  <CardDescription>Key metrics and properties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Molecular Weight</p>
                      <p className="text-lg font-semibold">
                        {summary?.molecular_weight_range.mean.toFixed(1)} ± {summary?.molecular_weight_range.std.toFixed(1)} Da
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">LogP</p>
                      <p className="text-lg font-semibold">
                        {summary?.logp_range.mean.toFixed(2)} ± {summary?.logp_range.std.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Lipinski RO5 Pass</p>
                      <p className="text-lg font-semibold text-green-600">
                        {(summary?.lipinski_ro5_pass_rate * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Veber Pass</p>
                      <p className="text-lg font-semibold text-green-600">
                        {(summary?.veber_pass_rate * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Metals Included</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(summary?.metal_distribution || {}).sort().map(metal => (
                        <Badge key={metal} variant="outline">{metal}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Functionalization Types</CardTitle>
                  <CardDescription>Distribution across reaction types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={functionalizationDistribution.slice(0, 8)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percent }) => `${type.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {functionalizationDistribution.slice(0, 8).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search MXene, group, SMILES..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="pl-10"
                    />
                  </div>

                  <select
                    value={selectedMetal}
                    onChange={(e) => {
                      setSelectedMetal(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Metals</option>
                    {uniqueMetals.map(metal => (
                      <option key={metal} value={metal}>{metal}</option>
                    ))}
                  </select>

                  <select
                    value={selectedFunctionalization}
                    onChange={(e) => {
                      setSelectedFunctionalization(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">All Functionalizations</option>
                    {uniqueFunctionalizations.map(func => (
                      <option key={func} value={func}>{func.replace(/_/g, ' ')}</option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="Best_Binding_All_Targets">Best Binding Energy</option>
                    <option value="Mean_Binding_All_Targets">Mean Binding Energy</option>
                    <option value="LogP">LogP</option>
                    <option value="MolecularWeight">Molecular Weight</option>
                    <option value="TPSA">TPSA</option>
                  </select>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                  </p>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">MXene</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metal</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Functional Group</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">MW (Da)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">LogP</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">TPSA</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Best Binding</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SMILES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedData.map((row, idx) => (
                        <tr key={row.ID} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm">{row.ID}</td>
                          <td className="px-4 py-3 text-sm font-medium">{row.MXene_Base}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="secondary">{row.Metal}</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{row.Product_Group}</td>
                          <td className="px-4 py-3 text-sm">{row.MolecularWeight?.toFixed(1)}</td>
                          <td className="px-4 py-3 text-sm">{row.LogP?.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm">{row.TPSA?.toFixed(1)}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`font-semibold ${row.Best_Binding_All_Targets < -10 ? 'text-green-600' : row.Best_Binding_All_Targets < -8 ? 'text-blue-600' : 'text-gray-600'}`}>
                              {row.Best_Binding_All_Targets?.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs font-mono max-w-xs truncate">{row.SMILES_Clean}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Metal Distribution</CardTitle>
                  <CardDescription>Number of entries per metal</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={metalDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metal" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Binding Energy Distribution</CardTitle>
                  <CardDescription>Histogram of best binding energies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bindingEnergyDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="energy" label={{ value: 'Binding Energy (kcal/mol)', position: 'insideBottom', offset: -5 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>LogP vs Molecular Weight</CardTitle>
                  <CardDescription>Lipophilicity-size relationship</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="MW" name="Molecular Weight" label={{ value: 'MW (Da)', position: 'insideBottom', offset: -5 }} />
                      <YAxis dataKey="LogP" name="LogP" label={{ value: 'LogP', angle: -90, position: 'insideLeft' }} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Compounds" data={logPvsMW} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Functionalization Distribution</CardTitle>
                  <CardDescription>Entries by reaction type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={functionalizationDistribution} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="type" type="category" width={120} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Top Binders Tab */}
          <TabsContent value="top-binders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top 20 Binders
                </CardTitle>
                <CardDescription>Compounds with strongest binding energies across all targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredData.slice(0, 20).map((row, idx) => (
                    <div key={row.ID} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                          idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{row.MXene_Base} + {row.Product_Group}</p>
                          <p className="text-sm text-gray-600">
                            {row.Functionalization_Type?.replace(/_/g, ' ')} | MW: {row.MolecularWeight?.toFixed(1)} Da | LogP: {row.LogP?.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 font-mono mt-1">{row.SMILES_Clean}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{row.Best_Binding_All_Targets?.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">kcal/mol</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>MXene Functionalization Database | {data.length.toLocaleString()} entries | 99 properties | 5 protein targets</p>
          <p className="mt-2">Data sources: D. Ontiveros et al., J. Mater. Chem. A (2023) & Energy Environ. Mater. (2024)</p>
        </div>
      </footer>
    </div>
  )
}

export default App
